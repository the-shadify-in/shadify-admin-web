# `shadify-admin-web`

Administrative Management Portal and Backend-For-Frontend (BFF) client for the Shadify Digital Wedding Platform.

## Technology Stack
- **Framework**: Next.js 16.4.6 (Active LTS)
- **UI Runtime**: React 19.2.9 & React DOM 19.2.9 (Strictly Pinned)
- **Bundler**: Turbopack
- **Styling**: Tailwind CSS 3.4.17
- **Icons**: Lucide React 0.475.0

## Documentation
Comprehensive engineering documentation, BFF routing guides, and UI specifications are available in the [`docs/`](./docs/README.md) directory:
- [`docs/01-architecture-and-bff.md`](./docs/01-architecture-and-bff.md): Next.js App Router, React Server Components & VPC ALB routing
- [`docs/02-security-and-auth.md`](./docs/02-security-and-auth.md): Admin sessions, CSRF lifecycle & DLQ replay protocol
- [`docs/03-ui-components-and-flows.md`](./docs/03-ui-components-and-flows.md): Component hierarchy, metrics cards & wedding directory
- [`docs/04-optimizations-and-caching.md`](./docs/04-optimizations-and-caching.md): Cloudflare edge cache bypass & Turbopack builds
- [`docs/05-progress-tracking.md`](./docs/05-progress-tracking.md): Phase 2 milestone progress ledger

## Quickstart
```bash
npm ci
npm run dev
```
