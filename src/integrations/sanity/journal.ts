import {createBuildClient} from "./client";
import {sanityBuildConfig} from "./env";
import {adaptSanityJournalPost, adaptSeedJournalPost} from "./journal-adapter";
import {publishedJournalPostsQuery} from "./queries";
import type {JournalEntry, SanityJournalPost} from "./types";

let journalPromise: Promise<JournalEntry[]> | undefined;
let sourceNoticeShown = false;
const buildRequestTag = `static-build-${Date.now().toString(36)}`;

async function loadJournal(): Promise<JournalEntry[]> {
  const config = sanityBuildConfig();

  if (config.source === "fixture") {
    if (!sourceNoticeShown) {
      const reason = process.env.SANITY_JOURNAL_SOURCE === "fixture"
        ? "SANITY_JOURNAL_SOURCE=fixture"
        : "SANITY_PROJECT_ID is not configured";
      console.warn(`[journal] Using the migration/rollback fixture because ${reason}.`);
      sourceNoticeShown = true;
    }
    const {journal: journalSeed} = await import("@/content/journal");
    return journalSeed.map(adaptSeedJournalPost).sort((a, b) => b.date.localeCompare(a.date));
  }

  if (!sourceNoticeShown) {
    console.info(
      `[journal] Using Sanity project ${config.projectId}, dataset ${config.dataset}, published perspective (${config.token ? "authenticated" : "tokenless"}).`,
    );
    sourceNoticeShown = true;
  }

  const client = createBuildClient(config);
  const documents = await client.fetch<SanityJournalPost[]>(
    publishedJournalPostsQuery,
    {},
    {cache: "force-cache", perspective: "published", tag: buildRequestTag},
  );
  return documents.map(adaptSanityJournalPost);
}

export function getJournalEntries(): Promise<JournalEntry[]> {
  journalPromise ??= loadJournal();
  return journalPromise;
}

export async function getJournalEntry(slug: string): Promise<JournalEntry | undefined> {
  const entries = await getJournalEntries();
  return entries.find((entry) => entry.slug === slug);
}

export async function getPublishedJournalSlugs(): Promise<string[]> {
  const entries = await getJournalEntries();
  return entries.map((entry) => entry.slug);
}

export type {JournalEntry} from "./types";
