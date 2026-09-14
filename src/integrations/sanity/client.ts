import {createClient, type SanityClient} from "@sanity/client";
import {SANITY_API_VERSION, type SanityBuildConfig} from "./env";

export function createBuildClient(config: SanityBuildConfig): SanityClient {
  if (!config.projectId) {
    throw new Error("Cannot create the Sanity build client without SANITY_PROJECT_ID.");
  }

  return createClient({
    projectId: config.projectId,
    dataset: config.dataset,
    apiVersion: SANITY_API_VERSION,
    perspective: "published",
    useCdn: false,
    token: config.token,
  });
}
