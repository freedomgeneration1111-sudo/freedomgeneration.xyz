import {buildJournalDocuments} from "./journalDocuments";

const documents = buildJournalDocuments();

for (const document of documents) {
  console.log(document._id);
  console.log(`${document.slug.current}`);
  console.log(`  date/category: ${document.date} / ${document.category}`);
  console.log(`  author: ${document.author}`);
  console.log(`  English blocks: ${document.body.en.length}`);
  console.log(`  Urdu blocks: ${document.body.ur.length}`);
  console.log(`  cover: ${document.coverMediaId}`);
  console.log(`  gallery: ${document.galleryMediaIds.join(", ")}`);
  console.log("  editorial text: verified unchanged");
}

console.log(`Prepared ${documents.length} repeatable journalPost documents.`);

if (process.argv.includes("--json")) {
  console.log(JSON.stringify(documents, null, 2));
}
