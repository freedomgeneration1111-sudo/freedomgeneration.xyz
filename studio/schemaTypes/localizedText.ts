import {defineField, defineType} from "sanity";

export const localizedText = defineType({
  name: "localizedText",
  title: "English and Urdu long text",
  type: "object",
  fields: [
    defineField({
      name: "en",
      title: "English",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "ur",
      title: "Urdu / اردو",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  options: {columns: 1},
});
