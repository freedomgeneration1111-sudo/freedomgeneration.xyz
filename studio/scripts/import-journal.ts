import {getCliClient} from "sanity/cli";
import {buildJournalDocuments} from "./journalDocuments";

const API_VERSION = "2026-09-01";
const client = getCliClient({apiVersion: API_VERSION});
const documents = buildJournalDocuments();

let transaction = client.transaction();
for (const document of documents) {
  transaction = transaction.createOrReplace(document);
}

const result = await transaction.commit({visibility: "sync"});

console.log(`Imported ${documents.length} published Journal posts.`);
console.log(`Transaction: ${result.transactionId}`);
for (const document of documents) {
  console.log(`  ${document.slug.current}`);
}
