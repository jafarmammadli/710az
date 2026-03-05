# 710.az

**Automotive e-commerce for Azerbaijan** — car oils, fluids, filters, and parts. Built to scale into a physical quick-lube service (O2O) later.

**Why 710?** OIL upside down. Memorable. Brandable.

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Hosting:** Vercel
- **Database & Auth:** Supabase
- **Payments:** Stripe
- **Search:** Meilisearch
- **Admin:** Payload CMS
- **Styling:** Tailwind CSS

---

## Branch Strategy

| Branch | Purpose |
|--------|---------|
| **main** | Production. Deploys to 710.az. Only merge from `dev` when ready to release. |
| **dev** | Development. Default branch for feature work. Integrate here before releasing. |

Workflow: create feature branches from `dev` → merge to `dev` → when stable, merge `dev` → `main` and deploy.

---

## Project Status

See **[PROGRESS.md](./PROGRESS.md)** for the full roadmap, phase checklist, and session updates.

---

## Repo

https://github.com/jafarmammadli/710az
