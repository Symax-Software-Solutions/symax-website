#!/usr/bin/env node
/**
 * Directus Schema Migration — Symax Website
 *
 * Creates event_portfolio and testimonials collections with all fields
 * and sets public read permissions on published items.
 *
 * Usage:
 *   node directus/migrations/001-schema.mjs
 *
 * Or with custom URL/credentials:
 *   DIRECTUS_URL=http://localhost:8055 \
 *   DIRECTUS_EMAIL=admin@example.com \
 *   DIRECTUS_PASSWORD=yourpassword \
 *   node directus/migrations/001-schema.mjs
 *
 * Safe to re-run — existing fields are skipped, not overwritten.
 */

const BASE = process.env.DIRECTUS_URL || 'http://localhost:8055'
const EMAIL = process.env.DIRECTUS_EMAIL || 'michael.voss@symaxsoftware.com'
const PASSWORD = process.env.DIRECTUS_PASSWORD || 'SYmax2026!'

// ─── Auth ────────────────────────────────────────────────────────────────────

async function getToken() {
  const res = await fetch(`${BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  })
  const data = await res.json()
  if (!data.data?.access_token) throw new Error(`Auth failed: ${JSON.stringify(data)}`)
  return data.data.access_token
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

async function request(token, method, path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  return res.json()
}

async function collectionExists(token, name) {
  const res = await request(token, 'GET', `/collections/${name}`)
  return !!res.data
}

async function fieldExists(token, collection, field) {
  const res = await request(token, 'GET', `/fields/${collection}/${field}`)
  return !!res.data
}

async function createCollection(token, payload) {
  const exists = await collectionExists(token, payload.collection)
  if (exists) {
    console.log(`  ⏭  Collection "${payload.collection}" already exists — skipping`)
    return
  }
  const res = await request(token, 'POST', '/collections', payload)
  if (res.data) {
    console.log(`  ✅ Created collection "${payload.collection}"`)
  } else {
    console.log(`  ❌ Failed to create "${payload.collection}": ${res.errors?.[0]?.message}`)
  }
}

async function createField(token, collection, payload) {
  const exists = await fieldExists(token, collection, payload.field)
  if (exists) {
    process.stdout.write(`  ⏭  ${payload.field} `)
    return
  }
  const res = await request(token, 'POST', `/fields/${collection}`, payload)
  if (res.data) {
    process.stdout.write(`  ✅ ${payload.field} `)
  } else {
    process.stdout.write(`  ❌ ${payload.field}(${res.errors?.[0]?.message}) `)
  }
}

async function grantPublicRead(token, collection) {
  // Find the public policy
  const policies = await request(token, 'GET', '/policies')
  const publicPolicy = policies.data?.find(p =>
    p.name === '$t:public_label' || p.name?.toLowerCase() === 'public'
  )
  if (!publicPolicy) {
    console.log(`  ⚠️  Could not find public policy — skipping permissions`)
    return
  }

  // Check if permission already exists
  const existing = await request(token, 'GET',
    `/permissions?filter[policy][_eq]=${publicPolicy.id}&filter[collection][_eq]=${collection}&filter[action][_eq]=read`
  )
  if (existing.data?.length > 0) {
    console.log(`  ⏭  Public read on "${collection}" already set`)
    return
  }

  const res = await request(token, 'POST', '/permissions', {
    policy: publicPolicy.id,
    collection,
    action: 'read',
    fields: ['*'],
    permissions: { status: { _eq: 'published' } },
  })
  if (res.data) {
    console.log(`  ✅ Public read granted on "${collection}" (published items only)`)
  } else {
    console.log(`  ❌ Failed: ${res.errors?.[0]?.message}`)
  }
}

// ─── Schema Definition ───────────────────────────────────────────────────────

const EVENT_PORTFOLIO_FIELDS = [
  {
    field: 'slug',
    type: 'string',
    meta: { width: 'half', interface: 'input', options: { slug: true }, note: 'URL-friendly identifier e.g. pumptrack-worlds-2024' },
    schema: { is_unique: true },
  },
  {
    field: 'title',
    type: 'string',
    meta: { width: 'full', interface: 'input', required: true },
    schema: {},
  },
  {
    field: 'subtitle',
    type: 'string',
    meta: { width: 'full', interface: 'input' },
    schema: {},
  },
  {
    field: 'date',
    type: 'date',
    meta: { width: 'half', interface: 'datetime' },
    schema: {},
  },
  {
    field: 'location',
    type: 'string',
    meta: { width: 'half', interface: 'input', options: { placeholder: 'City, Country' } },
    schema: {},
  },
  {
    field: 'flag_emoji',
    type: 'string',
    meta: { width: 'half', interface: 'input', options: { placeholder: '🇨🇭' }, note: 'Country flag emoji' },
    schema: {},
  },
  {
    field: 'description',
    type: 'text',
    meta: { width: 'full', interface: 'input-rich-text-html' },
    schema: {},
  },
  {
    field: 'cover_image',
    type: 'uuid',
    meta: { width: 'full', interface: 'file-image', special: ['file'] },
    schema: {},
  },
  {
    field: 'tags',
    type: 'json',
    meta: { width: 'full', interface: 'tags', special: ['cast-json'] },
    schema: {},
  },
  {
    field: 'featured',
    type: 'boolean',
    meta: { width: 'half', interface: 'boolean', note: 'Show on homepage portfolio section' },
    schema: { default_value: false },
  },
  {
    field: 'show_scoreboard',
    type: 'boolean',
    meta: {
      width: 'half',
      interface: 'boolean',
      note: '⚡ Show embedded Phoenix live scoreboard on this event page',
    },
    schema: { default_value: false },
  },
  {
    field: 'phoenix_event_id',
    type: 'string',
    meta: {
      width: 'half',
      interface: 'input',
      note: 'Event ID from Phoenix API (required when show_scoreboard is ON)',
    },
    schema: {},
  },
  {
    field: 'phoenix_api_url',
    type: 'string',
    meta: {
      width: 'half',
      interface: 'input',
      note: 'Optional: override Phoenix API base URL for this event',
      options: { placeholder: 'https://api.phoenix.yourdomain.com' },
    },
    schema: {},
  },
]

const TESTIMONIALS_FIELDS = [
  {
    field: 'quote',
    type: 'text',
    meta: { width: 'full', interface: 'input-multiline', required: true },
    schema: {},
  },
  {
    field: 'author_name',
    type: 'string',
    meta: { width: 'half', interface: 'input', required: true },
    schema: {},
  },
  {
    field: 'author_role',
    type: 'string',
    meta: { width: 'half', interface: 'input', options: { placeholder: 'Timing Director, UCI Event' } },
    schema: {},
  },
  {
    field: 'author_initials',
    type: 'string',
    meta: { width: 'half', interface: 'input', options: { placeholder: 'TD' }, note: '2-letter fallback avatar' },
    schema: {},
  },
]

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n🚀 Symax Directus Schema Migration`)
  console.log(`   Target: ${BASE}\n`)

  let token
  try {
    token = await getToken()
    console.log('✅ Authenticated\n')
  } catch (e) {
    console.error(`❌ Authentication failed: ${e.message}`)
    console.error(`   Make sure Directus is running at ${BASE}`)
    process.exit(1)
  }

  // ── event_portfolio ─────────────────────────────────────────────────────
  console.log('📁 event_portfolio')
  await createCollection(token, {
    collection: 'event_portfolio',
    meta: {
      display_template: '{{flag_emoji}} {{title}}',
      sort_field: 'sort',
      icon: 'event',
      archive_field: 'status',
      archive_value: 'archived',
      unarchive_value: 'draft',
    },
    schema: {},
    fields: [
      { field: 'id', type: 'uuid', meta: { hidden: true, readonly: true }, schema: { is_primary_key: true, has_auto_increment: false } },
      {
        field: 'status', type: 'string',
        meta: {
          width: 'half',
          interface: 'select-dropdown',
          display: 'labels',
          options: { choices: [{ text: 'Published', value: 'published' }, { text: 'Draft', value: 'draft' }, { text: 'Archived', value: 'archived' }] },
          display_options: { choices: [{ text: 'Published', value: 'published', foreground: '#FFFFFF', background: '#00C897' }, { text: 'Draft', value: 'draft', foreground: '#18222F', background: '#D3DAE4' }, { text: 'Archived', value: 'archived', foreground: '#FFFFFF', background: '#F7971C' }] },
        },
        schema: { default_value: 'draft', is_nullable: false },
      },
      { field: 'sort', type: 'integer', meta: { hidden: true }, schema: {} },
    ],
  })

  console.log('  Adding fields:')
  for (const field of EVENT_PORTFOLIO_FIELDS) {
    await createField(token, 'event_portfolio', field)
  }
  console.log('\n')

  console.log('  Permissions:')
  await grantPublicRead(token, 'event_portfolio')

  // ── testimonials ────────────────────────────────────────────────────────
  console.log('\n📁 testimonials')
  await createCollection(token, {
    collection: 'testimonials',
    meta: {
      display_template: '{{author_name}} — {{author_role}}',
      sort_field: 'sort',
      icon: 'format_quote',
    },
    schema: {},
    fields: [
      { field: 'id', type: 'uuid', meta: { hidden: true, readonly: true }, schema: { is_primary_key: true, has_auto_increment: false } },
      {
        field: 'status', type: 'string',
        meta: {
          width: 'half',
          interface: 'select-dropdown',
          options: { choices: [{ text: 'Published', value: 'published' }, { text: 'Draft', value: 'draft' }] },
        },
        schema: { default_value: 'draft' },
      },
      { field: 'sort', type: 'integer', meta: { hidden: true }, schema: {} },
    ],
  })

  console.log('  Adding fields:')
  for (const field of TESTIMONIALS_FIELDS) {
    await createField(token, 'testimonials', field)
  }
  console.log('\n')

  console.log('  Permissions:')
  await grantPublicRead(token, 'testimonials')

  console.log('\n✅ Migration complete!\n')
  console.log(`   Admin UI: ${BASE}/admin`)
  console.log(`   Collections: event_portfolio, testimonials\n`)
}

main().catch(e => {
  console.error('\n❌ Migration failed:', e.message)
  process.exit(1)
})
