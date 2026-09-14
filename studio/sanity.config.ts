import {defineConfig} from "sanity";
import {structureTool} from "sanity/structure";
import {schemaTypes} from "./schemaTypes";
import {journalStructure} from "./structure";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID;

if (!projectId) {
  throw new Error(
    "SANITY_STUDIO_PROJECT_ID is required. Copy ../.env.example to .env and add the Sanity project ID.",
  );
}

export default defineConfig({
  name: "default",
  title: "Freedom Generation School",
  projectId,
  dataset: process.env.SANITY_STUDIO_DATASET ?? "production",
  plugins: [structureTool({structure: journalStructure})],
  schema: {types: schemaTypes},
});
