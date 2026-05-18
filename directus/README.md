# Directus CMS - Symax Website

Directus powers the dynamic content for the Symax website, including event portfolio entries, testimonials, and Phoenix downloads.

## Quick start

```bash
cd directus
docker compose up -d
```

Admin panel: **http://localhost:8055**

Optional local overrides can be added in `directus/.env`.

## Setting up collections

After first launch, create the collections described in [`schema.md`](./schema.md):

1. Open Directus Admin -> Settings -> Data Model
2. Create the `event_portfolio` collection with all fields
3. Create the `testimonials` collection with all fields
4. Set the "Status" field as the status interface for each collection
5. Add some test content and publish it

## CORS

CORS is pre-configured to allow requests from `http://localhost:4400` during local Angular development.

## Volumes

Data is persisted in Docker volumes:

- `directus_db` - SQLite database
- `directus_uploads` - uploaded images and files

To reset everything:

```bash
docker compose down -v
docker compose up -d
```

## Production notes

Before deploying to production:

1. Create the root `.env.production` file from `.env.production.example`
2. Set a secure `DIRECTUS_SECRET`
3. Set `DIRECTUS_ADMIN_EMAIL` and `DIRECTUS_ADMIN_PASSWORD`
4. Set `DIRECTUS_PUBLIC_URL=https://cms.symaxsoftware.com`
5. Set `DIRECTUS_CORS_ORIGIN=https://symaxsoftware.com`
6. Consider switching from SQLite to PostgreSQL for larger-scale usage
