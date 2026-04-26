import { CollectionConfig } from "payload";

export const Experience: CollectionConfig = {
  slug: "experience",
  access: {
    read: () => true
  },
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true
    },
    {
      name: "type",
      type: "relationship",
      required: true,
      relationTo: "experience-type"
    },
    {
      name: "venue",
      type: "text",
    },
    {
      name: "geographicLocation",
      type: "text",
    },
    {
      name: 'startDate',
      type: "date",
      admin: {
        date: {
          displayFormat: "MMMM dd, yyyy"
        }
      },
      required: true
    },
    {
      name: 'endDate',
      type: "date",
      admin: {
        date: {
          displayFormat: "MMMM dd, yyyy"
        }
      },
      required: false
    }
  ]
}