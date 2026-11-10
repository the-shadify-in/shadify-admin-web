# 01 — `shadify-admin-web` Architecture & BFF Routing

**Framework:** Next.js 16.4.6, React 19.2.9, React DOM 19.2.9  
**Deployment:** Google Cloud Run (Regional: `asia-south1`)  
**Network Path:** Public HTTPS via Cloudflare $\to$ Admin Browser $\to$ Private VPC Internal ALB $\to$ `shadify-api`

---

## 1. Architectural Role & Responsibilities

`shadify-admin-web` provides a secure, modern management console for platform operators and super-admins:
1. **Administrative UI**: Responsive management views for weddings, entitlements, user roles, and platform metrics.
2. **Backend-For-Frontend (BFF)**: Consolidates administrative operations, managing authenticated browser sessions while communicating privately with `shadify-api` over Google Cloud internal networking.
3. **DLQ Operator Console**: Provides authorized visual tooling to inspect failed outbox events and initiate cryptographically signed replays.

---

## 2. BFF Communication Flow (Private VPC Ingress)

```mermaid
flowchart LR
    Admin["Admin Browser"] -->|HTTPS (Cloudflare)| AdminWeb["shadify-admin-web\n(Cloud Run)"]
    AdminWeb -->|1. Request Service Account Token| Metadata["GCP Metadata Server\n(http://metadata.google.internal)"]
    Metadata -->|2. OIDC Bearer Token| AdminWeb
    AdminWeb -->|3. POST /internal-bff/* + Token| IntALB["Internal Application Load Balancer\n(10.0.0.100:8080)"]
    IntALB --> Fastify["shadify-api\n(Internal Routes Plugin)"]
```

### Private Networking Guarantees:
- `shadify-admin-web` uses Direct VPC Egress to route requests to the private DNS/IP of the Internal ALB (`http://internal-alb.vpc.local:8080`).
- No administrative traffic travels over the public internet.
- Every request carries a short-lived Google OIDC identity token signed by Google, targeted strictly to audience `https://shadify-api-internal-bff`.
