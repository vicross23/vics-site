import { CollectionConfig } from "payload";

export const ExperienceType: CollectionConfig = {
  slug: "experience-type",
  fields: [
    {
      name: "name",
      type: "text",
      required: true
    },
    {
      name: "experiences",
      type: 'join',
      collection: "experience",
      on: "type",
      defaultSort: "-startDate",
    }
  ],
  admin: { useAsTitle: "name" },
}