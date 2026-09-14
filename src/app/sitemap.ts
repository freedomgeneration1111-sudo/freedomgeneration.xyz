import type { MetadataRoute } from "next";
import { locales } from "@/content/i18n";
import { projects } from "@/content/projects";
import { getJournalEntries } from "@/integrations/sanity/journal";
import { urlFor } from "@/lib/meta";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const journal = await getJournalEntries();
  const staticPaths = [
    "",
    "our-story",
    "teaching",
    "programs",
    "journal",
    "projects",
    "transparency",
    "contact",
    "support",
  ];
  const staticRoutes = locales.flatMap((locale) =>
    staticPaths.map((path) => ({
      url: urlFor(locale, path),
      lastModified: new Date("2026-09-01"),
    })),
  );
  const journalRoutes = locales.flatMap((locale) =>
    journal.map((entry) => ({
      url: urlFor(locale, `journal/${entry.slug}`),
      lastModified: new Date(entry.updatedAt ?? entry.date),
    })),
  );
  const projectRoutes = locales.flatMap((locale) =>
    projects.map((project) => ({
      url: urlFor(locale, `projects/${project.slug}`),
      lastModified: new Date("2026-09-01"),
    })),
  );
  return [...staticRoutes, ...journalRoutes, ...projectRoutes];
}
