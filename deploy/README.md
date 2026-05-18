# Production deployment

This repository is set up for automated production deployments to `symaxsoftware.com` from the `master` branch.

## What gets deployed

- `https://symaxsoftware.com` and `https://www.symaxsoftware.com` serve the Angular frontend
- `https://cms.symaxsoftware.com` serves Directus
- GitHub Actions connects over SSH and runs [`deploy/deploy.sh`](./deploy.sh) on the server

## Server bootstrap

1. Install Docker, the Docker Compose plugin, git, nginx, certbot, and the nginx certbot plugin.
2. Create a dedicated deploy user:

```bash
sudo adduser --disabled-password --gecos "" deploy
sudo usermod -aG docker deploy
sudo mkdir -p /srv
sudo chown deploy:deploy /srv
```

3. Add the GitHub Actions deploy key to `/home/deploy/.ssh/authorized_keys`.
4. Clone the repo as the deploy user:

```bash
sudo -u deploy git clone <repo-url> /srv/symax-website
```

5. Create the production env file from the example:

```bash
sudo -u deploy cp /srv/symax-website/.env.production.example /srv/symax-website/.env.production
sudo -u deploy nano /srv/symax-website/.env.production
```

6. Install the bootstrap nginx vhost from [`deploy/nginx/symaxsoftware.bootstrap.conf`](./nginx/symaxsoftware.bootstrap.conf) and reload nginx.
7. Issue a certificate that covers `symaxsoftware.com`, `www.symaxsoftware.com`, and `cms.symaxsoftware.com`:

```bash
sudo certbot --nginx -d symaxsoftware.com -d www.symaxsoftware.com -d cms.symaxsoftware.com
```

8. Replace the bootstrap vhost with the final TLS config from [`deploy/nginx/symaxsoftware.com.conf`](./nginx/symaxsoftware.com.conf) and reload nginx.

## GitHub Actions secrets

- `DEPLOY_HOST=212.227.193.203`
- `DEPLOY_USER=deploy`
- `DEPLOY_SSH_KEY`
- `DEPLOY_PORT` if the SSH port is not `22`

## Deployment flow

1. Push to `master`
2. GitHub Actions SSHes into the server
3. [`deploy/deploy.sh`](./deploy.sh) fast-forwards `master`
4. Docker Compose rebuilds the frontend and restarts the stack

## Notes

- Keep `.env.production` on the server only.
- The frontend reads `SYMAX_DIRECTUS_URL` and `SYMAX_PHOENIX_API_URL` from container env at startup.
- Directus is bound to `127.0.0.1:8055` and the frontend to `127.0.0.1:8080`; only nginx should be public.
