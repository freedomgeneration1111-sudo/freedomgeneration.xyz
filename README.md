# Freedom Generation School — freedomgeneration.xyz

Bilingual (English/Urdu) documentary school website for Freedom Generation School System, Faisalabad. Next.js 15 App Router, React 19, TypeScript, Tailwind CSS 4, static export for Cloudflare Pages.

Strategic source of truth: `FREEDOM-GENERATION-SCHOOL-PROJECT-MEMORY.md` (repo root). Standing build rules: `CLAUDE.md`.

The School Journal is managed in the public Sanity project `ypv2g0fi`, dataset `production`, and fetched only during `next build`. Those identifiers and Sanity authority are built-in defaults, so a production build does not depend on environment-variable injection. All other content areas remain in `src/content/`. See [`docs/sanity-journal.md`](docs/sanity-journal.md) for architecture, setup, import, deployment automation, and rollback.

## Commands

Node.js 22.12 or newer is required by the installed Sanity client and Portable Text packages.

```bash
npm install
npm --prefix studio install
npm run dev            # local dev (contact API not available here — see below)
npm run build          # static export → out/
npm run typecheck      # root TypeScript validation
npm run verify         # validate bilingual Journal routes and static SEO output
npm run placeholders   # regenerate public/media placeholder JPGs from the registry
npm run deploy         # npx wrangler pages deploy out --project-name freedom-generation

npm --prefix studio run dev
npm --prefix studio run journal:preview
npm --prefix studio run journal:import
```

No Sanity environment variables are required for the normal public-site build: it defaults to project `ypv2g0fi`, dataset `production`, source `sanity`, and tokenless published reads. Values in `.env.local`, CI, or Cloudflare may deliberately override those defaults. The public production dataset does not require `SANITY_API_READ_TOKEN`; a private replacement dataset would require a build-only read token, which must never use a `NEXT_PUBLIC_*` name. Set `SANITY_JOURNAL_SOURCE=fixture` only for an explicit rollback or development build—missing variables never select the fixture.

Copy `.env.example` to `studio/.env` when configuring the separate Studio package.

To test the contact form locally, build first, then run the static site together with the Pages Function:

```bash
npx wrangler pages dev out
```

## Structure

- `src/content/*.ts` — local site copy/data. `journal.ts` is now the Journal migration seed and rollback fixture, not the configured production authority.
- `src/integrations/sanity/` — build-only Journal client, GROQ query, validation adapter, and frontend view model.
- `studio/` — separate Sanity Studio package exposing only the Journal schema in this migration slice.
- `src/content/media/registry.ts` — the 24-photo registry. Real photography replaces `public/media/<ID>.jpg` by filename; no code changes needed.
- `src/app/[locale]/…` — pages, `en` (default) and `ur` (RTL, Noto Nastaliq Urdu).
- `functions/api/contact.ts` — Cloudflare Pages Function; sends via Resend when `RESEND_API_KEY` is set (Pages project env var), logs otherwise.
- `docs/source-data/` — original budget/calendar CSVs and seed-content files the content modules were built from.

## Deploy notes

- Cloudflare Pages project name: `freedom-generation`; custom domain `freedomgeneration.xyz`.
- `public/_redirects` sends `/` → `/en/`.
- Intended production build command: `npm run build`; output directory: `out/`.
- Sanity defaults are project `ypv2g0fi`, dataset `production`, source `sanity`; `wrangler.toml` repeats these public values for Pages/Function consistency, but the Next.js build does not depend on their injection.
- `SANITY_JOURNAL_SOURCE=fixture` is the explicit Journal rollback/development switch. Production never silently falls back to the fixture because Sanity variables are missing.
- Set `RESEND_API_KEY` in the Pages project settings to activate contact-form email delivery.
