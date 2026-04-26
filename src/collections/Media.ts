import type { CollectionConfig } from "payload";
import {
  removeMediaFromProjects,
  syncMediaProjectsToProject,
} from "~/lib/project-media-sync";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [syncMediaProjectsToProject],
    afterDelete: [removeMediaFromProjects],
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
      name: "projects",
      type: "relationship",
      relationTo: "projects",
      hasMany: true,
    },
  ],
  admin: {
    useAsTitle: "title",
  },
  upload: {
    mimeTypes: ["image/*"],
  },
};
