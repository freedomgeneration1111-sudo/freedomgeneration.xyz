# Freedom Generation School — freedomgeneration.xyz

Bilingual (English/Urdu) documentary school website for Freedom Generation School System, Faisalabad. Next.js 15 App Router, React 19, TypeScript, Tailwind CSS 4, static export for Cloudflare Pages.

Strategic source of truth: `FREEDOM-GENERATION-SCHOOL-PROJECT-MEMORY.md` (repo root). Standing build rules: `CLAUDE.md`.

## Commands

```bash
npm install
npm run dev            # local dev (contact API not available here — see below)
npm run build          # static export → out/
npm run placeholders   # regenerate public/media placeholder JPGs from the registry
npm run deploy         # npx wrangler pages deploy out --project-name freedom-generation
```

To test the contact form locally, build first, then run the static site together with the Pages Function:

```bash
npx wrangler pages dev out
```

## Structure

- `src/content/*.ts` — ALL site copy and data, bilingual `{en, ur}` records. Never put school copy in components.
- `src/content/media/registry.ts` — the 24-photo registry. Real photography replaces `public/media/<ID>.jpg` by filename; no code changes needed.
- `src/app/[locale]/…` — pages, `en` (default) and `ur` (RTL, Noto Nastaliq Urdu).
- `functions/api/contact.ts` — Cloudflare Pages Function; sends via Resend when `RESEND_API_KEY` is set (Pages project env var), logs otherwise.
- `docs/source-data/` — original budget/calendar CSVs and seed-content files the content modules were built from.

## Deploy notes

- Cloudflare Pages project name: `freedom-generation`; custom domain `freedomgeneration.xyz`.
- `public/_redirects` sends `/` → `/en/`.
- Set `RESEND_API_KEY` in the Pages project settings to activate contact-form email delivery.
