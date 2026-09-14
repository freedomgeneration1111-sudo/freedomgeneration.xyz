export const SANITY_API_VERSION = "2026-09-01";

export type JournalSource = "sanity" | "fixture";

export type SanityBuildConfig = {
  source: JournalSource;
  projectId?: string;
  dataset: string;
  token?: string;
};

function nonEmpty(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

export function sanityBuildConfig(): SanityBuildConfig {
  const projectId = nonEmpty(process.env.SANITY_PROJECT_ID);
  const dataset = nonEmpty(process.env.SANITY_DATASET) ?? "production";
  const token = nonEmpty(process.env.SANITY_API_READ_TOKEN);
  const requestedSource = nonEmpty(process.env.SANITY_JOURNAL_SOURCE);

  if (requestedSource && requestedSource !== "sanity" && requestedSource !== "fixture") {
    throw new Error('SANITY_JOURNAL_SOURCE must be either "sanity" or "fixture".');
  }

  if (requestedSource === "sanity" && !projectId) {
    throw new Error("SANITY_PROJECT_ID is required when SANITY_JOURNAL_SOURCE=sanity.");
  }

  return {
    source: requestedSource === "fixture" || !projectId ? "fixture" : "sanity",
    projectId,
    dataset,
    token,
  };
}
