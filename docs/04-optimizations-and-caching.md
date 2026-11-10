# 04 — `shadify-admin-web` Optimizations & Caching Policy

**Authority:** ADR-008 & Master Blueprint v1.0.18

---

## 1. Cloudflare Edge Cache Isolation

Because `shadify-admin-web` displays confidential platform metrics, customer PII, and financial shagun data, **administrative responses must never be cached at Cloudflare edge POPs**.

### Cloudflare Rules Language Syntax:
Edge cache bypass is enforced using array-matching expressions matching administrative paths and session cookies:

```text
(http.request.uri.path starts_with "/admin") or 
(http.request.uri.path starts_with "/internal-bff") or 
(any(http.request.headers["cookie"][*] matches "(^|;\\s*)(__Host-shadify_admin_session)"))
```

### Origin Cache-Control Policy:
All responses from `shadify-admin-web` return:
`Cache-Control: no-store, no-cache, private, must-revalidate`

---

## 2. Next.js 16 & Turbopack Compilation

- **Turbopack Build Pipeline**: Next.js 16 leverages Rust-based Turbopack for incremental bundling, achieving production compile times under 2 seconds (`Compiled successfully in 1931ms`).
- **Standalone Docker Output**: Configured with `output: 'standalone'` in `next.config.ts`, generating a minimal, self-contained Node.js server that copies only required `node_modules` into the final Cloud Run container image (~85MB image size).
- **CSS Tree-Shaking**: Tailwind CSS purges all unused utility classes, producing an optimized CSS bundle under 15 KB.
