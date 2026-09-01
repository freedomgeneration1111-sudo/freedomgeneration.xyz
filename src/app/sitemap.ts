import type { MetadataRoute } from "next";
import { locales } from "@/content/i18n";
import { journal } from "@/content/journal";
import { projects } from "@/content/projects";
import { urlFor } from "@/lib/meta";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
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
  const dynamicPaths = [
    ...journal.map((entry) => `journal/${entry.slug}`),
    ...projects.map((project) => `projects/${project.slug}`),
  ];
  return locales.flatMap((locale) =>
    [...staticPaths, ...dynamicPaths].map((path) => ({
      url: urlFor(locale, path),
      lastModified: new Date("2026-09-01"),
    }))
  );
}
