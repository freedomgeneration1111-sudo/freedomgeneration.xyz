import {existsSync, readFileSync, readdirSync} from "node:fs";
import path from "node:path";

const root = process.cwd();
const outDir = path.join(root, "out");
const canonicalOrigin = "https://freedomgeneration.xyz";
const locales = ["en", "ur"];
const journalSlugs = [
  "a-morning-at-freedom-generation",
  "six-classrooms-and-a-hall",
  "building-80-percent-complete",
];
const forbiddenMarkers = ["drafts.", "sanity-pipeline-test"];
const failures = [];
let checks = 0;

function fail(message) {
  failures.push(message);
}

function expect(condition, message) {
  checks += 1;
  if (!condition) fail(message);
}

function read(relativePath) {
  const absolutePath = path.join(root, relativePath);
  expect(existsSync(absolutePath), `Missing ${relativePath}`);
  return existsSync(absolutePath) ? readFileSync(absolutePath, "utf8") : "";
}

function expectContains(haystack, needle, context) {
  expect(haystack.includes(needle), `${context} is missing ${needle}`);
}

function filesUnder(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, {withFileTypes: true}).flatMap((entry) => {
    const child = path.join(directory, entry.name);
    return entry.isDirectory() ? filesUnder(child) : [child];
  });
}

expect(existsSync(outDir), "Missing out/. Run npm run build before npm run verify.");

const home = Object.fromEntries(
  locales.map((locale) => [locale, read(`out/${locale}/index.html`)]),
);
const journalIndex = Object.fromEntries(
  locales.map((locale) => [locale, read(`out/${locale}/journal/index.html`)]),
);
const projectPage = Object.fromEntries(
  locales.map((locale) => [
    locale,
    read(`out/${locale}/projects/complete-school-building/index.html`),
  ]),
);
const sitemap = read("out/sitemap.xml");

for (const slug of journalSlugs) {
  for (const locale of locales) {
    const relativePath = `out/${locale}/journal/${slug}/index.html`;
    const html = read(relativePath);
    const canonical = `${canonicalOrigin}/${locale}/journal/${slug}/`;
    const enUrl = `${canonicalOrigin}/en/journal/${slug}/`;
    const urUrl = `${canonicalOrigin}/ur/journal/${slug}/`;

    expectContains(html, `<link rel="canonical" href="${canonical}"/>`, relativePath);
    expectContains(html, `rel="alternate" hrefLang="en" href="${enUrl}"`, relativePath);
    expectContains(html, `rel="alternate" hrefLang="ur" href="${urUrl}"`, relativePath);
    expectContains(html, `rel="alternate" hrefLang="x-default" href="${enUrl}"`, relativePath);
    expectContains(html, `<meta property="og:url" content="${canonical}"/>`, relativePath);
    expectContains(html, `<meta property="og:type" content="article"/>`, relativePath);
    expectContains(html, `"@type":"BlogPosting"`, relativePath);
    expectContains(html, `"@id":"${canonical}"`, relativePath);
    expectContains(journalIndex[locale], `/${locale}/journal/${slug}/`, `${locale} Journal index`);
    expectContains(sitemap, canonical, "sitemap.xml");
  }
}

for (const locale of locales) {
  const updatePath = `/${locale}/journal/building-80-percent-complete/`;
  expectContains(projectPage[locale], updatePath, `${locale} project-linked Journal update`);
}

for (const locale of locales) {
  const detailLink = new RegExp(`/${locale}/journal/([^/"?#]+)/`, "g");
  const latestSlugs = [
    ...new Set([...home[locale].matchAll(detailLink)].map((match) => match[1])),
  ];
  expect(latestSlugs.length === 3, `${locale} homepage does not expose exactly three latest posts`);
  for (const slug of latestSlugs) {
    expect(
      existsSync(path.join(outDir, locale, "journal", slug, "index.html")),
      `${locale} homepage latest post has no exported detail route: ${slug}`,
    );
    expectContains(journalIndex[locale], `/${locale}/journal/${slug}/`, `${locale} latest post`);
  }
}

expectContains(home.ur, `<html lang="ur" dir="rtl"`, "Urdu homepage");

const exportedFiles = filesUnder(outDir);
for (const marker of forbiddenMarkers) {
  expect(
    !exportedFiles.some((file) => path.relative(outDir, file).includes(marker)),
    `Exported path contains forbidden marker: ${marker}`,
  );
  expect(!sitemap.includes(marker), `sitemap.xml contains forbidden marker: ${marker}`);
  for (const locale of locales) {
    expect(!home[locale].includes(marker), `${locale} homepage contains forbidden marker: ${marker}`);
    expect(
      !journalIndex[locale].includes(marker),
      `${locale} Journal index contains forbidden marker: ${marker}`,
    );
  }
}

if (failures.length > 0) {
  console.error(`Static verification failed (${failures.length} of ${checks} checks):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(`Static verification passed: ${checks} checks.`);
  console.log("- Six bilingual seed Journal routes exist in out/.");
  console.log("- Canonical, hreflang, Open Graph, and BlogPosting metadata are present.");
  console.log("- Homepage latest-three, project linkage, and sitemap entries are present.");
  console.log("- Draft and temporary pipeline-test paths are absent.");
}
