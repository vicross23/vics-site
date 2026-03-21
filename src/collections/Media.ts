import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "isSmall",
      type: "checkbox",
      defaultValue: false,
    },
    {
      name: "location",
      type: "text",
    },
    {
      name: "date",
      type: "date",
      admin: {
        date: {
          displayFormat: "MMMM dd, yyyy",
        },
      },
    },
    {
      name: "project",
      type: "relationship",
      relationTo: "projects",
    },
  ],
  admin: {
    useAsTitle: "title",
  },
  upload: {
    mimeTypes: ["image/*"],
  },
};
