import {marked} from "marked";

type MarkdownToken = {
  type: string;
  text?: string;
  depth?: number;
  href?: string;
  tokens?: MarkdownToken[];
  ordered?: boolean;
  items?: Array<{tokens?: MarkdownToken[]}>;
};

export type PortableTextSpan = {
  _key: string;
  _type: "span";
  text: string;
  marks: string[];
};

export type PortableTextBlock = {
  _key: string;
  _type: "block";
  style: "normal" | "h2" | "h3" | "blockquote";
  children: PortableTextSpan[];
  markDefs: Array<{
    _key: string;
    _type: "link";
    href: string;
  }>;
  listItem?: "bullet" | "number";
  level?: number;
};

function nonEmptyText(value: unknown): value is string {
  return typeof value === "string" && value.length > 0;
}

export function markdownToPortableText(markdown: string): PortableTextBlock[] {
  let sequence = 0;
  const nextKey = (prefix: string) =>
    `${prefix}${(++sequence).toString(36).padStart(4, "0")}`;

  const spansFor = (
    tokens: MarkdownToken[] | undefined,
    markDefs: PortableTextBlock["markDefs"],
    inheritedMarks: string[] = [],
  ): PortableTextSpan[] => {
    if (!tokens) return [];

    return tokens.flatMap((token): PortableTextSpan[] => {
      if (token.type === "text" || token.type === "escape") {
        if (token.tokens?.length) {
          return spansFor(token.tokens, markDefs, inheritedMarks);
        }
        if (!nonEmptyText(token.text)) return [];
        return [
          {
            _key: nextKey("s"),
            _type: "span",
            text: token.text,
            marks: inheritedMarks,
          },
        ];
      }

      if (token.type === "strong" || token.type === "em") {
        return spansFor(token.tokens, markDefs, [...inheritedMarks, token.type]);
      }

      if (token.type === "link") {
        if (!nonEmptyText(token.href)) throw new Error("Markdown link is missing its destination.");
        const markKey = nextKey("m");
        markDefs.push({_key: markKey, _type: "link", href: token.href});
        return spansFor(token.tokens, markDefs, [...inheritedMarks, markKey]);
      }

      if (token.type === "br") {
        return [
          {
            _key: nextKey("s"),
            _type: "span",
            text: "\n",
            marks: inheritedMarks,
          },
        ];
      }

      throw new Error(`Unsupported inline Markdown construct: ${token.type}`);
    });
  };

  const blockFor = (
    tokens: MarkdownToken[] | undefined,
    style: PortableTextBlock["style"],
    listItem?: PortableTextBlock["listItem"],
  ): PortableTextBlock => {
    const markDefs: PortableTextBlock["markDefs"] = [];
    const children = spansFor(tokens, markDefs);

    if (!children.some((child) => child.text.length > 0)) {
      throw new Error(`Markdown ${style} block has no written content.`);
    }

    return {
      _key: nextKey("b"),
      _type: "block",
      style,
      children,
      markDefs,
      ...(listItem ? {listItem, level: 1} : {}),
    };
  };

  const blocks: PortableTextBlock[] = [];
  const topLevel = marked.lexer(markdown) as MarkdownToken[];

  for (const token of topLevel) {
    if (token.type === "space") continue;

    if (token.type === "paragraph") {
      blocks.push(blockFor(token.tokens, "normal"));
      continue;
    }

    if (token.type === "heading") {
      if (token.depth !== 2 && token.depth !== 3) {
        throw new Error(`Only Markdown headings 2 and 3 are supported; found heading ${token.depth}.`);
      }
      blocks.push(blockFor(token.tokens, token.depth === 2 ? "h2" : "h3"));
      continue;
    }

    if (token.type === "blockquote") {
      for (const quoteToken of token.tokens ?? []) {
        if (quoteToken.type === "space") continue;
        if (quoteToken.type !== "paragraph") {
          throw new Error(`Unsupported Markdown inside blockquote: ${quoteToken.type}`);
        }
        blocks.push(blockFor(quoteToken.tokens, "blockquote"));
      }
      continue;
    }

    if (token.type === "list") {
      for (const item of token.items ?? []) {
        const itemTokens = item.tokens ?? [];
        if (itemTokens.some((itemToken) => itemToken.type === "list")) {
          throw new Error("Nested Markdown lists are not supported by the Journal schema.");
        }
        blocks.push(blockFor(itemTokens, "normal", token.ordered ? "number" : "bullet"));
      }
      continue;
    }

    throw new Error(`Unsupported top-level Markdown construct: ${token.type}`);
  }

  if (blocks.length === 0) throw new Error("Journal body cannot be empty.");
  return blocks;
}

export function portableTextPlainText(blocks: PortableTextBlock[]): string {
  return blocks
    .map((block) => block.children.map((child) => child.text).join(""))
    .join("\n");
}

export function markdownPlainText(markdown: string): string {
  const tokenText = (token: MarkdownToken): string => {
    if (token.tokens?.length) return token.tokens.map(tokenText).join("");
    if (nonEmptyText(token.text)) return token.text;
    return "";
  };

  const lines: string[] = [];
  for (const token of marked.lexer(markdown) as MarkdownToken[]) {
    if (token.type === "space") continue;
    if (token.type === "list") {
      for (const item of token.items ?? []) {
        lines.push((item.tokens ?? []).map(tokenText).join(""));
      }
      continue;
    }
    if (token.type === "blockquote") {
      for (const quoteToken of token.tokens ?? []) {
        if (quoteToken.type !== "space") lines.push(tokenText(quoteToken));
      }
      continue;
    }
    lines.push(tokenText(token));
  }
  return lines.join("\n");
}
