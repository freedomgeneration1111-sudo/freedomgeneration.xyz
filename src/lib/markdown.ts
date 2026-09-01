import { marked } from "marked";

// Content markdown is first-party (src/content/*.ts), rendered at build time.
export function renderMarkdown(md: string): string {
  return marked.parse(md, { async: false, gfm: true, breaks: false }) as string;
}
