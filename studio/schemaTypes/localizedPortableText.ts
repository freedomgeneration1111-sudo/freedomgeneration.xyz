import {defineArrayMember, defineField, defineType} from "sanity";

const richTextBlock = defineArrayMember({
  type: "block",
  styles: [
    {title: "Paragraph", value: "normal"},
    {title: "Heading 2", value: "h2"},
    {title: "Heading 3", value: "h3"},
    {title: "Quote", value: "blockquote"},
  ],
  lists: [
    {title: "Bulleted list", value: "bullet"},
    {title: "Numbered list", value: "number"},
  ],
  marks: {
    decorators: [
      {title: "Strong", value: "strong"},
      {title: "Emphasis", value: "em"},
    ],
    annotations: [
      {
        name: "link",
        title: "Link",
        type: "object",
        fields: [
          defineField({
            name: "href",
            title: "Web address",
            type: "url",
            validation: (Rule) =>
              Rule.required().uri({
                allowRelative: true,
                scheme: ["http", "https", "mailto", "tel"],
              }),
          }),
        ],
      },
    ],
  },
});

const hasWrittenContent = (value: unknown) => {
  if (!Array.isArray(value)) return "Write at least one paragraph.";

  const hasText = value.some((block) => {
    if (!block || typeof block !== "object" || !("children" in block)) return false;
    const children = (block as {children?: unknown}).children;
    return (
      Array.isArray(children) &&
      children.some(
        (child) =>
          child &&
          typeof child === "object" &&
          "text" in child &&
          typeof (child as {text?: unknown}).text === "string" &&
          (child as {text: string}).text.trim().length > 0,
      )
    );
  });

  return hasText || "Write at least one paragraph.";
};

export const localizedPortableText = defineType({
  name: "localizedPortableText",
  title: "English and Urdu article body",
  type: "object",
  fields: [
    defineField({
      name: "en",
      title: "English body",
      description: "The full English article.",
      type: "array",
      of: [richTextBlock],
      validation: (Rule) => Rule.required().min(1).custom(hasWrittenContent),
    }),
    defineField({
      name: "ur",
      title: "Urdu body / اردو",
      description: "The full Urdu article. Both languages are required before publishing.",
      type: "array",
      of: [richTextBlock],
      validation: (Rule) => Rule.required().min(1).custom(hasWrittenContent),
    }),
  ],
  options: {columns: 1},
});
