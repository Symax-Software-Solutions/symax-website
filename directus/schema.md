# Directus Collections Schema

Create these collections in the Directus admin panel (Settings → Data Model).

---

## Collection: `event_portfolio`

Events shown on the website's event portfolio page. Each event can optionally embed a Phoenix scoreboard.

| Field | Type | Interface | Notes |
|-------|------|-----------|-------|
| `id` | uuid | — | Primary key (auto) |
| `status` | string | Status | `published` / `draft` / `archived` |
| `sort` | integer | Sort | Display order |
| `slug` | string (unique) | Input | URL slug, e.g. `pumptrack-worlds-2024` |
| `title` | string | Input | Event title |
| `subtitle` | string | Input | Short subtitle / tagline |
| `date` | date | DateTime | Event date |
| `location` | string | Input | City, Country |
| `flag_emoji` | string | Input | Flag emoji, e.g. 🇨🇭 |
| `description` | text | WYSIWYG | Rich text description (HTML) |
| `cover_image` | image (M2O → directus_files) | Image | Hero / cover image |
| `gallery` | O2M (event_portfolio_files) | Files | Multiple gallery photos |
| `tags` | json | Tags | Array of tag strings, e.g. `["Pumptrack", "UCI"]` |
| `featured` | boolean | Toggle | Show on homepage featured section |
| `show_scoreboard` | boolean | Toggle | Enable embedded Phoenix scoreboard |
| `phoenix_event_id` | string | Input | Event ID from Phoenix API |
| `phoenix_api_url` | string | Input | Optional override for Phoenix API base URL |

### Scoreboard Toggle

When `show_scoreboard` is **ON** and `phoenix_event_id` is set, the event detail page will automatically fetch and display live results from the Phoenix API. No code changes needed — just flip the switch.

---

## Collection: `testimonials`

Customer testimonials displayed on the website.

| Field | Type | Interface | Notes |
|-------|------|-----------|-------|
| `id` | uuid | — | Primary key (auto) |
| `status` | string | Status | `published` / `draft` |
| `sort` | integer | Sort | Display order |
| `quote` | text | Textarea | The testimonial text |
| `author_name` | string | Input | Author name |
| `author_role` | string | Input | Role / company |
| `author_initials` | string | Input | 2-letter initials (avatar fallback) |

---

## Collection: `phoenix_downloads`

Phoenix software releases. The website automatically displays the latest published version on the Phoenix product page. Upload installer files per platform — any platform without a file shows "Coming soon".

| Field | Type | Interface | Notes |
|-------|------|-----------|-------|
| `id` | uuid | — | Primary key (auto) |
| `status` | string | Status | `published` / `draft` |
| `sort` | integer | Sort | Higher sort = newer release (latest shown on site) |
| `version` | string | Input | Version tag, e.g. `v2.0.1` |
| `release_date` | date | DateTime | Release date |
| `release_notes` | text | Textarea | Short changelog shown on the download page |
| `windows_file` | file (M2O → directus_files) | File | Windows installer (.exe) |
| `macos_file` | file (M2O → directus_files) | File | macOS installer (.dmg) |
| `linux_file` | file (M2O → directus_files) | File | Linux package (.AppImage / .deb) |

### Publishing a New Release

1. Create a new item in `phoenix_downloads`
2. Set `version` (e.g. `v2.1.0`) and `release_date`
3. Write brief `release_notes`
4. Upload the installer file(s) to the platform fields
5. Set status to **Published**
6. The website automatically picks up the latest published release — no code changes needed

---

## Setting Up

1. Go to **Settings → Data Model → Create Collection**
2. Name it exactly as shown above (lowercase with underscores)
3. Add each field with the specified type and interface
4. For `status` fields, configure the options: `published`, `draft`, `archived`
5. For `tags`, use the JSON interface with Tag preset
6. For `cover_image`, use the Image interface (creates M2O to `directus_files`)
7. For `gallery`, use the Files interface (creates junction table automatically)

### Access Control

Make sure the **Public** role has read access to both collections, or create an API token for the website to use.

Go to **Settings → Access Control → Public** and grant:
- `event_portfolio`: Read
- `testimonials`: Read
- `phoenix_downloads`: Read
- `directus_files`: Read (needed for images and download files)
