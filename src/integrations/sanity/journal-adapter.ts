import type {PortableTextBlock} from "@portabletext/types";
import type {JournalEntry as SeedJournalEntry} from "@/content/journal";
import {
  journalCategories,
  type JournalCategory,
  type JournalEntry,
  type Localized,
  type SanityJournalPost,
} from "./types";

const sanityMediaIdAliases: Record<string, string> = {
  "cover-01": "JOURNAL-COVER-01",
};

function requiredString(value: unknown, field: string): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`Published Journal post has an empty or invalid ${field}.`);
  }
  return value;
}

function optionalString(value: unknown, field: string): string | undefined {
  if (value === undefined || value === null) return undefined;
  return requiredString(value, field);
}

function optionalSanityMediaId(value: unknown, field: string): string | undefined {
  const id = optionalString(value, field);
  return id ? (sanityMediaIdAliases[id] ?? id) : undefined;
}

function requiredLocalizedStrings(value: unknown, field: string): Localized<string> {
  if (!value || typeof value !== "object") {
    throw new Error(`Published Journal post is missing ${field}.`);
  }
  const localized = value as {en?: unknown; ur?: unknown};
  return {
    en: requiredString(localized.en, `${field}.en`),
    ur: requiredString(localized.ur, `${field}.ur`),
  };
}

function isPortableTextBlock(value: unknown): value is PortableTextBlock {
  if (!value || typeof value !== "object") return false;
  const block = value as {_type?: unknown; children?: unknown};
  if (block._type !== "block" || !Array.isArray(block.children)) return false;
  return block.children.some(
    (child) =>
      child !== null &&
      typeof child === "object" &&
      "text" in child &&
      typeof (child as {text?: unknown}).text === "string" &&
      (child as {text: string}).text.trim().length > 0,
  );
}

function requiredLocalizedBody(value: unknown): Localized<PortableTextBlock[]> {
  if (!value || typeof value !== "object") {
    throw new Error("Published Journal post is missing body.");
  }
  const localized = value as {en?: unknown; ur?: unknown};
  const bodyFor = (body: unknown, locale: "en" | "ur") => {
    if (!Array.isArray(body) || body.length === 0 || !body.every(isPortableTextBlock)) {
      throw new Error(`Published Journal post has an empty or invalid body.${locale}.`);
    }
    return body;
  };
  return {en: bodyFor(localized.en, "en"), ur: bodyFor(localized.ur, "ur")};
}

function category(value: unknown): JournalCategory {
  const candidate = requiredString(value, "category");
  if (!journalCategories.includes(candidate as JournalCategory)) {
    throw new Error(`Published Journal post has unsupported category: ${candidate}.`);
  }
  return candidate as JournalCategory;
}

function mediaIds(value: unknown): string[] {
  if (value === undefined || value === null) return [];
  if (!Array.isArray(value)) {
    throw new Error("Published Journal post has invalid galleryMediaIds.");
  }
  return value.map((id, index) => requiredString(id, `galleryMediaIds[${index}]`));
}

function facebook(value: unknown): JournalEntry["facebook"] {
  if (value === undefined || value === null) return undefined;
  if (typeof value !== "object") {
    throw new Error("Published Journal post has invalid facebook metadata.");
  }
  const record = value as Record<string, unknown>;
  const status = optionalString(record.status, "facebook.status");
  if (status && !["not-selected", "ready", "published", "failed"].includes(status)) {
    throw new Error(`Published Journal post has unsupported facebook.status: ${status}.`);
  }
  return {
    postId: optionalString(record.postId, "facebook.postId"),
    url: optionalString(record.url, "facebook.url"),
    publishedAt: optionalString(record.publishedAt, "facebook.publishedAt"),
    status: status as JournalEntry["facebook"] extends {status?: infer Status}
      ? Status
      : never,
  };
}

export function adaptSanityJournalPost(document: SanityJournalPost): JournalEntry {
  const body = requiredLocalizedBody(document.body);
  return {
    slug: requiredString(document.slug, "slug"),
    date: requiredString(document.date, "date"),
    updatedAt: optionalString(document._updatedAt, "_updatedAt"),
    category: category(document.category),
    author: requiredString(document.author, "author"),
    title: requiredLocalizedStrings(document.title, "title"),
    excerpt: requiredLocalizedStrings(document.excerpt, "excerpt"),
    coverId: optionalSanityMediaId(document.coverMediaId, "coverMediaId"),
    galleryIds: mediaIds(document.galleryMediaIds),
    body: {
      en: {format: "portableText", value: body.en},
      ur: {format: "portableText", value: body.ur},
    },
    facebook: facebook(document.facebook),
  };
}

export function adaptSeedJournalPost(entry: SeedJournalEntry): JournalEntry {
  return {
    slug: entry.slug,
    date: entry.date,
    updatedAt: entry.date,
    category: entry.category,
    author: entry.author,
    title: entry.title,
    excerpt: entry.excerpt,
    coverId: entry.coverId,
    galleryIds: entry.galleryIds,
    body: {
      en: {format: "markdown", value: entry.body.en},
      ur: {format: "markdown", value: entry.body.ur},
    },
    facebook:
      entry.fbPostId || entry.fbUrl
        ? {postId: entry.fbPostId, url: entry.fbUrl}
        : undefined,
  };
}
