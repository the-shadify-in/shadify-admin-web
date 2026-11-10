# 03 — UI Components, Layout & User Flows

**Styling:** Tailwind CSS 3.4.17  
**Icons:** `lucide-react@0.475.0`  
**Layout:** Next.js App Router (`src/app/`)

---

## 1. Component Hierarchy

```text
src/
├── app/
│   ├── layout.tsx             # Root layout with antialiased font & meta
│   ├── page.tsx               # Root redirect / landing entry
│   ├── globals.css            # Tailwind directives & CSS variables
│   └── admin/
│       ├── layout.tsx         # Wraps admin views in AdminShell
│       ├── page.tsx           # Platform Overview Dashboard
│       ├── weddings/
│       │   └── page.tsx       # Weddings directory & quota table
│       └── dlq/
│           └── page.tsx       # DLQ inspection and replay console
├── components/
│   └── AdminShell.tsx         # Sticky header, navigation links, operational badge
└── lib/
    ├── api-client.ts          # Internal BFF client calling shadify-api
    └── auth.ts                # Session parsing & authentication helpers
```

---

## 2. Key User Flows

### Flow 1: Wedding Directory & Quota Administration
1. Operator navigates to `/admin/weddings`.
2. View displays real-time wedding status (`Draft`, `Preview`, `Published`), storage consumption (`12.4 GB / 50.0 GB`), and photo count (`1,420`).
3. Operator can view entitlements and trigger quota adjustments via BFF API.

### Flow 2: DLQ Inspection & Event Replay
1. Operator navigates to `/admin/dlq`.
2. Displays events that exhausted their 4-attempt retry budget in `dead_letter_events`.
3. Operator inspects failure stack traces (e.g., S3 connection timeout).
4. Operator clicks "Authorize Replay", generating a cryptographically signed HMAC token and sending it to `/internal-bff/dlq/replay`.
5. Event is re-queued as a fresh outbox event with incremented generation token.
