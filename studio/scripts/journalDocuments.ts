import {journal} from "../../src/content/journal";
import {
  markdownPlainText,
  markdownToPortableText,
  portableTextPlainText,
} from "./markdownToPortableText";

export function buildJournalDocuments() {
  return journal.map((entry) => {
    const body = {
      _type: "localizedPortableText",
      en: markdownToPortableText(entry.body.en),
      ur: markdownToPortableText(entry.body.ur),
    };

    for (const locale of ["en", "ur"] as const) {
      const before = markdownPlainText(entry.body[locale]);
      const after = portableTextPlainText(body[locale]);
      if (before !== after) {
        throw new Error(`${entry.slug} ${locale}: Portable Text conversion changed editorial wording.`);
      }
    }

    return {
      _id: `journalPost-${entry.slug}`,
      _type: "journalPost" as const,
      title: {_type: "localizedString", ...entry.title},
      slug: {_type: "slug", current: entry.slug},
      date: entry.date,
      category: entry.category,
      author: entry.author,
      excerpt: {_type: "localizedText", ...entry.excerpt},
      body,
      coverMediaId: entry.coverId,
      galleryMediaIds: entry.galleryIds,
      ...(entry.fbPostId || entry.fbUrl
        ? {
            facebook: {
              ...(entry.fbPostId ? {postId: entry.fbPostId} : {}),
              ...(entry.fbUrl ? {url: entry.fbUrl} : {}),
            },
          }
        : {}),
    };
  });
}
