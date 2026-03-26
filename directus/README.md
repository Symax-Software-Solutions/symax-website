# Directus CMS — Symax Website

Directus powers the dynamic content for the Symax website (event portfolio, testimonials, etc.).

## Quick Start

```bash
cd directus
docker compose up -d
```

Admin panel: **http://localhost:8055**

- Email: `michael.voss@symaxsoftware.com`
- Password: `SYmax2026!`

## Setting Up Collections

After first launch, create the collections described in [`schema.md`](./schema.md):

1. Open Directus Admin → Settings → Data Model
2. Create the `event_portfolio` collection with all fields
3. Create the `testimonials` collection with all fields
4. Set the "Status" field as the status interface for each collection
5. Add some test content and publish it

## CORS

CORS is pre-configured to allow requests from `http://localhost:4400` (Angular dev server).
For production, update `CORS_ORIGIN` in the docker-compose file.

## Volumes

Data is persisted in Docker volumes:
- `directus_db` — SQLite database
- `directus_uploads` — Uploaded images/files

To reset everything:
```bash
docker compose down -v
docker compose up -d
```

## Production Notes

Before deploying to production:
1. Change `SECRET` to a secure random string
2. Change `ADMIN_PASSWORD`
3. Update `PUBLIC_URL` and `CORS_ORIGIN` to match your domain
4. Consider switching from SQLite to PostgreSQL for better performance
