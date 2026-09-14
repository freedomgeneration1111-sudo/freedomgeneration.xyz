import React from "react";
import {renderToStaticMarkup} from "react-dom/server";
import {JournalBody} from "../src/components/JournalBody";
import type {JournalBody as JournalBodyValue} from "../src/integrations/sanity/types";
import {buildJournalDocuments} from "../studio/scripts/journalDocuments";

const documents = buildJournalDocuments();

for (const document of documents) {
  for (const locale of ["en", "ur"] as const) {
    const body = {
      format: "portableText",
      value: document.body[locale],
    } as JournalBodyValue;
    const html = renderToStaticMarkup(<JournalBody body={body} />);
    if (!html.includes("<p>") || html.trim().length === 0) {
      throw new Error(`${document.slug.current} ${locale}: Portable Text rendered no paragraphs.`);
    }
    console.log(`${document.slug.current} ${locale}: rendered ${html.length} HTML characters`);
  }
}

console.log("All migrated Journal bodies rendered through the restricted Portable Text layer.");
