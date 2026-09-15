# AGENTS.md — Project Rules for Freedom Generation School website
# Place in repo root. Read automatically by Codex every session — keep this to durable rules, not one-time build instructions.

## Source of truth
- `FREEDOM-GENERATION-SCHOOL-PROJECT-MEMORY.md` (repo root) is the strategic source of truth — 17 parts, exact numbers, bilingual copy, content-model TypeScript. If any instruction here conflicts with it, the memory file wins; flag the conflict, don't silently pick one.

## Stack
- Next.js 15 App Router, React 19, TypeScript, Tailwind CSS 4
- Static-first, SEO-first, `output: "export"` for Cloudflare Pages
- Domain `freedomgeneration.xyz`, canonical `https://freedomgeneration.xyz`
- Images: `unoptimized: true` (Cloudflare), AVIF/WebP, responsive `srcset`
- Mirrors the architecture used for mosesjorgensen.com and focuslabproductions.com — don't introduce a new stack without a reason

## Content architecture (critical)
- Content lives in `src/content/*.ts` — `site.ts`, `i18n.ts`, `schoolFacts.ts`, `teaching.ts`, `programs.ts`, `journal.ts`, `projects.ts`, `transparency.ts`
- `src/content/media/registry.ts` — 24 photo jobs, bilingual alt, consent flag
- Never bury school copy inside page components — content and presentation stay separate

## Bilingual
- App Router `[locale]` segment, `en` | `ur`, default `en`
- Every content record: `{en, ur}` fields, not separate file trees
- `dir="rtl"` for `ur`, Noto Nastaliq Urdu, line-height 2.0
- Locale switcher (`EN | اردو`) preserves the current path; non-locale `/` redirects to `/en/`

## Design system
- Forest `#124F38` (primary brand green), Deep Forest `#0E412F` (hover/darker), Sage `#71866A`, Ochre `#C49A55` (main accent), Terracotta `#B86F56`, Dusty Blue `#63869A`, Plum `#865C67`, Fruit Red `#B71C1C` (logo fruit only), Ink `#121212`, Paper `#FFFEFA`, Warm Clay `#E8DDD0`, Stone `#D8D0C5`, Error `#8B1E1E`
- Logo system: multicolored fruit tree with a dark green trunk, restrained leaves, exactly five red fruits, and no cross; formal identity `FREEDOM GENERATION / SCHOOL SYSTEM`; official motto `"teach your children well"`; horizontal website lockup, circular institutional badge/seal, tree icon mark, and favicon derived from the tree mark.
- Type: serif (Fraunces/Newsreader/IBM Plex Serif) for story/headings; sans (Instrument Sans/Inter/IBM Plex Sans) for UI/captions; Noto Nastaliq Urdu for `ur`
- Magazine documentary: large real photos, generous whitespace, short text beside images, editorial layout
- Avoid: card-stacking, stat dashboards, NGO stock iconography, stock photos, AI-substitute "documentary" imagery, donate popups, bloated nav
- Also avoid generic AI-page tells: warm-cream+terracotta default palette, tracked ALL-CAPS eyebrow labels, identical shadowed rounded cards, `→` on every button, numbered `01/02/03` markers where content isn't a real sequence
- Emotional target: "This is real. I can see what was done and what remains."

## Routes
`/[locale]/` (homepage, no single CTA) · `/[locale]/our-story` (longform) · `/[locale]/teaching` (methodology, 6 principles — no individual teacher headshots, privacy) · `/[locale]/programs` (2026–2027 hybrid calendar + daily schedule) · `/[locale]/journal`, `/[locale]/journal/[slug]` (3 seed posts) · `/[locale]/projects`, `/[locale]/projects/[slug]` (first: `complete-school-building`, 80%, goal 3,383,520 PKR with solar) · `/[locale]/transparency` (operating budget 290,667/mo, 3,488,000/yr, per-student 29,067/yr) · `/[locale]/contact` (form → freedomgenerationschool@gmail.com, address, +92 318-707-7423, WhatsApp) · `/[locale]/support` (low-emphasis)

## Locked facts — verbatim, don't paraphrase or recompute
- Enrollment: "more than 120" students, Play Group through Grade 10
- Address: Daak Khana Khas Chak 007 JB Punjawar Kohala, Faisalabad Punjab Pakistan 38000
- Phone/WhatsApp: +92 318-707-7423 (`wa.me/923187077423`)
- Email: freedomgenerationschool@gmail.com
- Legal name: Freedom Generation School System — registration pending (never publish an expired number)
- Founder/Principal: Komal Shahzadi; founded 2020
- Governance: no formal board — teachers' council (9 teachers + 1 guard = 10 staff), collaborative

## SEO & performance
- Real HTML for every critical fact (enrollment, location, grades, programs, current project, funding goal) — never JS-only counters or animation-gated values
- Metadata API, OG images from the media registry, canonical URLs, JSON-LD `School` schema, sitemap.xml, robots.txt, bilingual descriptive alt text
- Adaptive for low-bandwidth Pakistan connections

## Privacy & safeguarding
- Assume consent for group/classroom imagery for V1; explicit consent to be formalized at the next parents' meeting
- Teachers are mostly young Muslim women who prefer low publicity — never publish individual headshots or bios without explicit permission
- `/teaching` covers philosophy and method, not individual spotlights

## Funding language
- Never claim "100% / zero overhead." Use precise, accountable category language (teacher compensation, classroom/program costs, materials, facility, admin, fees, in-kind) per memory file §14

## Non-goals for V1
- No student portal, parent portal, LMS, school-management software, donor accounts, complex CRM/CMS, or heavy dynamic backend
- Preserve clean seams (not implementations) for: contact form, donations/payments, project ledger, Meta/Facebook publishing, WhatsApp, analytics, newsletter

## Photo placeholders
- No real photography exists in the build environment. Use structurally correct placeholders (solid color blocks in the design system's clay/stone tones, correct orientation, filed at `public/media/<registry-id>.jpg`) — never AI-generated photo-realistic substitutes. Real photos drop in later by filename.

## Build
```
npm install
npm run build   # → out/
npx wrangler pages deploy out --project-name freedom-generation
```
