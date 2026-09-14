import type {PortableTextBlock} from "@portabletext/types";

export type Localized<T> = {en: T; ur: T};

export const journalCategories = [
  "school-life",
  "story",
  "event",
  "project-update",
  "worship",
  "milestone",
] as const;

export type JournalCategory = (typeof journalCategories)[number];

export type JournalBody =
  | {format: "portableText"; value: PortableTextBlock[]}
  | {format: "markdown"; value: string};

export type JournalEntry = {
  slug: string;
  date: string;
  updatedAt?: string;
  category: JournalCategory;
  title: Localized<string>;
  excerpt: Localized<string>;
  coverId?: string;
  galleryIds: string[];
  body: Localized<JournalBody>;
  author: string;
  facebook?: {
    postId?: string;
    url?: string;
    publishedAt?: string;
    status?: "not-selected" | "ready" | "published" | "failed";
  };
};

export type SanityJournalPost = {
  _id?: unknown;
  _updatedAt?: unknown;
  slug?: unknown;
  date?: unknown;
  category?: unknown;
  author?: unknown;
  title?: unknown;
  excerpt?: unknown;
  body?: unknown;
  coverMediaId?: unknown;
  galleryMediaIds?: unknown;
  facebook?: unknown;
};
