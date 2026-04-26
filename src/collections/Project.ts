import { CollectionConfig } from "payload";
import { ProjectPageType } from "~/app/models";
import {
  removeProjectFromMedia,
  syncProjectImagesToMedia,
} from "~/lib/project-media-sync";

export const Project: CollectionConfig = {
  slug: "projects",
  admin: { useAsTitle: "name" },
  hooks: {
    afterChange: [syncProjectImagesToMedia],
    afterDelete: [removeProjectFromMedia],
  },
  fields: [
    { name: "name", type: "text", required: true },
    {
      name: "date", type: "date", admin: {
        date: {
          displayFormat: "MMMM dd, yyyy"
        }
      }, required: true
    },
    { name: "description", type: "textarea" },
    { name: "page", type: "select", options: [{ label: "Projects", value: ProjectPageType.Projects }, { label: "Personal", value: ProjectPageType.Personal }], required: true },
    { name: "images", type: "relationship", relationTo: "media", hasMany: true },
    { name: "coverImage", type: "relationship", relationTo: "media", required: true },
  ]
}
