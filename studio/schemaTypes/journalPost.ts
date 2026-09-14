import {defineArrayMember, defineField, defineType} from "sanity";

const categories = [
  {title: "School life", value: "school-life"},
  {title: "Story", value: "story"},
  {title: "Event", value: "event"},
  {title: "Project update", value: "project-update"},
  {title: "Worship", value: "worship"},
  {title: "Milestone", value: "milestone"},
];

const categoryValues = categories.map(({value}) => value);

const optionalNonBlank = (value: string | undefined) =>
  value === undefined || value.trim().length > 0 || "Remove this field or enter a value.";

export const journalPost = defineType({
  name: "journalPost",
  title: "Journal post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "localizedString",
      description: "The public title in English and Urdu.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Public URL slug",
      type: "slug",
      description: "Shared by both language pages. Avoid changing it after publication.",
      options: {
        source: "title.en",
        maxLength: 96,
        isUnique: (slug, context) => context.defaultIsUnique(slug, context),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Publication date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {list: categories, layout: "dropdown"},
      validation: (Rule) =>
        Rule.required().custom(
          (value) => value === undefined || categoryValues.includes(value) || "Choose a listed category.",
        ),
    }),
    defineField({
      name: "author",
      title: "Author or byline",
      type: "string",
      description: "For example, Komal Shahzadi or Teachers' Council. No author profile is created.",
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "excerpt",
      title: "Short summary",
      type: "localizedText",
      description: "Used on Journal lists, the homepage, search results, and social previews.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "Article body",
      type: "localizedPortableText",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coverMediaId",
      title: "Cover photo ID",
      type: "string",
      description: "An existing semantic ID from the website media registry, such as JOURNAL-COVER-01.",
      validation: (Rule) => Rule.custom(optionalNonBlank),
    }),
    defineField({
      name: "galleryMediaIds",
      title: "Gallery photo IDs",
      type: "array",
      description: "Existing semantic media IDs, in display order. Images remain in the website repository.",
      of: [
        defineArrayMember({
          type: "string",
          validation: (Rule) => Rule.required().min(1),
        }),
      ],
      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      name: "facebook",
      title: "Facebook distribution",
      type: "object",
      description: "Optional publishing record. The website remains the canonical copy.",
      options: {collapsible: true, collapsed: true},
      fields: [
        defineField({
          name: "postId",
          title: "Facebook post ID",
          type: "string",
          validation: (Rule) => Rule.custom(optionalNonBlank),
        }),
        defineField({
          name: "url",
          title: "Public Facebook post URL",
          type: "url",
          validation: (Rule) => Rule.uri({scheme: ["http", "https"]}),
        }),
        defineField({
          name: "publishedAt",
          title: "Facebook publication time",
          type: "datetime",
        }),
        defineField({
          name: "status",
          title: "Distribution status",
          type: "string",
          options: {
            list: [
              {title: "Not selected", value: "not-selected"},
              {title: "Ready", value: "ready"},
              {title: "Published", value: "published"},
              {title: "Failed", value: "failed"},
            ],
          },
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: "Publication date, newest first",
      name: "dateDesc",
      by: [{field: "date", direction: "desc"}],
    },
  ],
  preview: {
    select: {title: "title.en", urduTitle: "title.ur", date: "date", author: "author"},
    prepare({title, urduTitle, date, author}) {
      return {
        title: title || urduTitle || "Untitled Journal post",
        subtitle: [date, author].filter(Boolean).join(" · "),
      };
    },
  },
});
