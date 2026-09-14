# Freedom Generation Sanity Studio

This isolated Studio currently exposes only the bilingual **Journal** collection. The public Next.js application is not embedded here and does not use Studio at runtime.

From the repository root:

```bash
npm install
npm --prefix studio install
cp .env.example studio/.env
```

Set `SANITY_STUDIO_PROJECT_ID` and `SANITY_STUDIO_DATASET` in `studio/.env`, then run:

```bash
npm --prefix studio run dev
```

Before importing the seed, run `journal:preview` and `journal:render-smoke`. The authenticated `journal:import` command creates or replaces the three stable published seed documents. See [`../docs/sanity-journal.md`](../docs/sanity-journal.md) for the full workflow, public build variables, rollback, deployment, and validation.
