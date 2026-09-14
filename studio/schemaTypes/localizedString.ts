import {defineField, defineType} from "sanity";

export const localizedString = defineType({
  name: "localizedString",
  title: "English and Urdu text",
  type: "object",
  fields: [
    defineField({
      name: "en",
      title: "English",
      type: "string",
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "ur",
      title: "Urdu / اردو",
      type: "string",
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  options: {columns: 1},
});
