# `shadify-admin-web` Documentation Hub

Welcome to the internal engineering documentation for **`shadify-admin-web`**, the administrative management portal and Backend-For-Frontend (BFF) client for the Shadify Digital Wedding Platform.

---

## 1. Quick Navigation

| Document | Description |
| :--- | :--- |
| [`01-architecture-and-bff.md`](./01-architecture-and-bff.md) | Next.js 16 App Router, React 19.2.9 pinning, and private VPC BFF routing. |
| [`02-security-and-auth.md`](./02-security-and-auth.md) | Admin authentication, session hashing, CSRF tokens, and Google OIDC authentication. |
| [`03-ui-components-and-flows.md`](./03-ui-components-and-flows.md) | AdminShell, platform metrics, wedding directory, and DLQ recovery console. |
| [`04-optimizations-and-caching.md`](./04-optimizations-and-caching.md) | Edge cache bypass rules, Turbopack compilation, and asset optimization. |
| [`05-progress-tracking.md`](./05-progress-tracking.md) | Implementation milestones and verification status. |

---

## 2. Quickstart & Local Development

### Prerequisites
- Node.js `>=24.0.0 <25` (verified on `v24.22.2`)

### Commands
```bash
# Install dependencies
npm ci

# Validate lockfile
npm run lint:lockfile

# Start development server (Turbopack)
npm run dev

# Production build (Next.js standalone)
npm run build

# Start production server
npm run start
```
