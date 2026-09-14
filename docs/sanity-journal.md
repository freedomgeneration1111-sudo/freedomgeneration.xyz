# Sanity Journal architecture and operations

This document covers the first CMS migration slice only: the School Journal. Projects, financial data, Programs, Home, Our Story, Teaching, Support, institutional settings, media registry, and the Cloudflare contact function remain code-owned.

## Architecture

```text
Sanity Studio
    ↓ publish
Sanity Content Lake
    ↓ build-time GROQ (published perspective, CDN disabled)
strict Journal adapter / view model
    ↓
existing Next.js pages and components
    ↓ next build, output: export
static HTML in out/
    ↓
Cloudflare Pages
```

There is no runtime Sanity query, SSR, ISR, draft mode, middleware, server action, or embedded Studio. The public application imports Journal view models from `src/integrations/sanity/`; route components never consume raw Sanity documents.

The Studio is a separate package in `studio/`. Its desk exposes one editorial collection, **Journal**. It is intended for Sanity-hosted deployment.

## Journal model

Each `journalPost` is one bilingual document with shared operational fields:

- one slug, publication date, category, and author/byline
- English and Urdu title
- English and Urdu excerpt
- English and Urdu Portable Text body
- cover and gallery semantic media IDs
- optional Facebook distribution record

Both locales are required by schema validation and checked again by the build adapter. There is no English fallback. A missing or invalid locale fails the build rather than publishing incomplete content.

Portable Text is restricted to paragraphs, heading levels 2–3, blockquotes, ordered/unordered lists, strong/emphasis, and links. It has no raw HTML, scripts, embeds, image blocks, arbitrary components, or layout controls. Existing semantic IDs continue to resolve through `src/content/media/registry.ts` and files in `public/media/`; Sanity Assets are not part of this slice.

Allowed categories remain the existing application categories:

- `school-life`
- `story`
- `event`
- `project-update`
- `worship`
- `milestone`

Slugs are required and use Sanity's document-aware uniqueness check. The editor warns against changing a published slug because redirects are not included in this migration.

## Environment variables

Use `.env.example` as the name-only template.

Public Next.js build (`.env.local`, Cloudflare Pages build variables, or CI secrets):

```text
SANITY_PROJECT_ID
SANITY_DATASET
SANITY_API_READ_TOKEN       # private datasets only; build secret
SANITY_JOURNAL_SOURCE       # omit normally; set fixture only for rollback
```

Studio (`studio/.env` or Sanity-hosted Studio environment):

```text
SANITY_STUDIO_PROJECT_ID
SANITY_STUDIO_DATASET
```

`SANITY_API_READ_TOKEN` must be a least-privilege read-only token. It is consumed only by the build process and must never use a `NEXT_PUBLIC_*` name. Public datasets need no token for published content.

The client uses fixed API version `2026-09-01`, `perspective: "published"`, `useCdn: false`, and a `no-store` request. The GROQ query also excludes IDs under `drafts.**`. Drafts therefore produce neither `generateStaticParams()` values nor public HTML.

## Initial setup and seed import

No Sanity project ID or dataset was available during implementation. Once an administrator creates or identifies the intended project and dataset:

1. Copy `.env.example` to `.env.local` and `studio/.env`, filling the applicable names.
2. Install both packages with `npm install` and `npm --prefix studio install`.
3. Inspect the deterministic conversion:

   ```bash
   npm --prefix studio run journal:preview
   npm --prefix studio run journal:render-smoke
   ```

4. Sign in with the Sanity CLI and import the three published seed documents:

   ```bash
   cd studio
   npx sanity login
   npm run journal:import
   ```

5. Open Studio and inspect all English/Urdu fields, media IDs, dates, categories, bylines, and slugs before the first production build.

The importer reads `src/content/journal.ts`, converts its Markdown deterministically, verifies the visible text has not changed, and uses stable IDs of the form `journalPost.<slug>`. It runs as one `createOrReplace` transaction, so it is repeatable and intentionally overwrites those three stable seed IDs. Run the preview first. The import creates published documents; it does not create drafts.

The three preserved slugs are:

- `a-morning-at-freedom-generation`
- `six-classrooms-and-a-hall`
- `building-80-percent-complete`

The project record remains local TypeScript and still links its update by the third shared slug.

## Build behavior and rollback

When `SANITY_PROJECT_ID` is present, Sanity is the only Journal provider used by the public build. Published records drive:

- both English and Urdu detail routes from `generateStaticParams()`
- Journal index ordering
- homepage latest-three preview
- project-linked Journal updates
- localized metadata and Open Graph article data
- `BlogPosting` JSON-LD
- sitemap paths and dates

When no project ID is configured, the build prints an explicit warning and uses `src/content/journal.ts` so this repository remains buildable before external setup. This is a migration/bootstrap condition, not the intended production configuration.

For an intentional rollback, set this build variable and redeploy:

```text
SANITY_JOURNAL_SOURCE=fixture
```

That forces the preserved seed even when Sanity identifiers exist. Remove the override to return to Sanity. Do not edit both sources in parallel: after initial import, routine editorial changes belong in Sanity; the local file is a migration/rollback snapshot only.

If a Sanity build fails, Cloudflare Pages should keep serving the previous successful static deployment. Do not silently fall back from an attempted Sanity query to local data—the provider only uses the fixture when configuration is absent or the rollback override is explicit.

## Intended production deployment

The intended repository deployment path is:

```text
GitHub main
    ↓ Cloudflare Pages Git integration
npm run build
    ↓
out/
```

Configure Cloudflare Pages with:

- production branch: `main`
- build command: `npm run build`
- output directory: `out`
- Node.js 22.12 or newer
- `SANITY_PROJECT_ID` and `SANITY_DATASET`
- build-only `SANITY_API_READ_TOKEN` only if the dataset is private
- existing `RESEND_API_KEY` for the separate contact Pages Function

The intended editorial publishing path is:

```text
Sanity Publish
    ↓ Sanity webhook
Cloudflare Pages Deploy Hook
    ↓
new static build
```

After the Pages Git project exists, create a production Deploy Hook for `main`. Treat its URL as a secret. Configure a Sanity webhook for create/update/delete events affecting published `journalPost` documents, excluding draft IDs, and point it at the Deploy Hook URL. Test all three lifecycle events: first publish, update, and unpublish/delete. A newly published record should create both locale routes on that build; an unpublished record should remove both routes.

References: [Cloudflare Pages Git integration](https://developers.cloudflare.com/pages/configuration/git-integration/), [Cloudflare Pages Deploy Hooks](https://developers.cloudflare.com/pages/configuration/deploy-hooks/), [Sanity webhooks](https://www.sanity.io/docs/content-lake/webhooks).

## Validation and verification commands

```bash
npx tsc --noEmit
npm run build
npm --prefix studio run typecheck
npm --prefix studio run journal:preview
npm --prefix studio run journal:render-smoke
npm --prefix studio run schema:validate
npm --prefix studio run build
```

`schema:validate`, real Studio deployment, and real import require a valid Sanity project configuration and authenticated access. A Studio bundle can still be compiled with a syntactically valid placeholder ID to verify local bundling, but that does not validate remote project access.

After the public build, verify `out/` contains all six localized detail pages, localized canonical/alternate metadata, `BlogPosting` JSON-LD, and sitemap entries. Confirm there are no `drafts.*` paths.

## External setup still unresolved

The 2026-09-14 inspection found all of the following unresolved:

- no Sanity project/dataset identifiers in the repository or environment
- no Studio deployment
- no Git remote
- no `freedom-generation` Pages project in the authenticated Cloudflare account
- no Cloudflare Pages Git integration or Deploy Hook
- no Sanity webhook
- `freedomgeneration.xyz` apparently in a Namecheap contact-verification/holding state

These external issues must be repaired by the relevant account owners. This repository change does not create, modify, or claim completion of any external Sanity, GitHub, Cloudflare, DNS, or Namecheap resource.
