import { CollectionConfig } from "payload";

export const Collection: CollectionConfig = {
  slug: "collections",
  admin: { useAsTitle: "name" },
  fields: [
    { name: "name", type: "text", required: true },
    {
      name: "date", type: "date", admin: {
        date: {
          displayFormat: "MMMM dd, yyyy"
        }
      }, required: true
    },
    { name: "images", type: "relationship", relationTo: "media", hasMany: true }
  ]
}