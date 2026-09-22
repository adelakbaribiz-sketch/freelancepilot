# Deployment

## Deploying this demo

The app is a standard Next.js application with no backend dependency, so it
deploys anywhere Next.js does.

### Option A — Vercel (simplest)

```bash
npm install -g vercel
vercel
```

No environment variables are required — the demo has no external
dependencies.

### Option B — Docker

```dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
EXPOSE 3000
CMD ["npm", "start"]
```

```bash
docker build -t freelancepilot-demo .
docker run -p 3000:3000 freelancepilot-demo
```

## Environment variables

None are required to run the demo — see [`.env.example`](../.env.example)
for the variables a **real backend** would introduce (all currently unused;
listed so the gap between demo and real deployment is explicit, not so they
need to be set now).

## Deploying the real (proposed) system

Not applicable yet — there is no backend to deploy. When
[Stage 1 of the roadmap](ROADMAP.md#stage-1--real-mvp) is built, this
section should be replaced with real infrastructure-as-code and a real
environment variable reference, not written speculatively now.
