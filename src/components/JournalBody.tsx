import React from "react";
import {PortableText, type PortableTextComponents} from "@portabletext/react";
import type {JournalBody as JournalBodyValue} from "@/integrations/sanity/types";
import {renderMarkdown} from "@/lib/markdown";

const components: PortableTextComponents = {
  block: {
    normal: ({children}) => <p>{children}</p>,
    h2: ({children}) => <h2>{children}</h2>,
    h3: ({children}) => <h3>{children}</h3>,
    blockquote: ({children}) => <blockquote>{children}</blockquote>,
  },
  list: {
    bullet: ({children}) => <ul>{children}</ul>,
    number: ({children}) => <ol>{children}</ol>,
  },
  listItem: ({children}) => <li>{children}</li>,
  marks: {
    strong: ({children}) => <strong>{children}</strong>,
    em: ({children}) => <em>{children}</em>,
    link: ({children, value}) => <a href={value?.href}>{children}</a>,
  },
};

function rejectUnknownPortableText(message: string): never {
  throw new Error(`Unsupported Journal Portable Text: ${message}`);
}

export function JournalBody({body}: {body: JournalBodyValue}) {
  if (body.format === "markdown") {
    // Only the checked-in migration/rollback fixture uses this trusted Markdown path.
    return <div dangerouslySetInnerHTML={{__html: renderMarkdown(body.value)}} />;
  }

  return (
    <PortableText
      value={body.value}
      components={components}
      onMissingComponent={rejectUnknownPortableText}
    />
  );
}
