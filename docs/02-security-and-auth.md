# 02 — Security, Session Management & Authentication

**Authority:** ADR-010, ADR-011 & Master Blueprint v1.0.18

---

## 1. Administrative Session Security

To prevent session hijacking, privilege escalation, and cross-site scripting/request forgery:

1. **Cookie Architecture**:
   - Cookie Name: `__Host-shadify_admin_session`
   - Attributes: `Secure; HttpOnly; SameSite=Lax; Path=/`
   - Prefix: The `__Host-` prefix is strictly enforced by modern browsers, guaranteeing that the cookie cannot be set or overwritten from insecure HTTP or subdomains.
2. **Session Storage & Hashing**:
   - Session identifiers are generated via `crypto.randomBytes(32)` (256-bit entropy).
   - In the database, only the cryptographic hash of the session token is persisted, preventing database dump credential exposure.
3. **Anti-CSRF Protection**:
   - All state-mutating requests (`POST`, `PUT`, `DELETE`) require a double-submit CSRF token passed via header `x-shadify-csrf-token`.
   - The token rotation protocol is multi-tab safe: tokens are tied to the session life rather than single-request invalidation.

---

## 2. DLQ Operator Replay Protocol

Dead-letter queue replay operations (`POST /internal-bff/dlq/replay`) require elevated cryptographic verification:
- Operator must be an active user with role `SUPER_ADMIN`.
- Operator secret keys are stored in Cloud KMS / Secret Manager and mapped to `shadify_admin_ops.operator_auth_secrets`.
- Replay requests require a canonical HMAC-SHA256 signature calculated over:
  `dlq_id:operator_id:timestamp_epoch:nonce:action`
- The database procedure `replay_dead_letter_event` asserts:
  - Timestamp drift is within $\pm 60$ seconds.
  - HMAC signature matches via fixed-iteration 32-byte XOR accumulator.
  - Nonce has not been consumed previously (enforced via primary key).
  - Target photo's `processing_generation` is incremented, and an immutable entry is added to `audit_log`.
