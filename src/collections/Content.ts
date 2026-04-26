import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { CollectionConfig } from "payload";

export const Content: CollectionConfig = {
  slug: "content",
  admin: {
    useAsTitle: "key"
  },
  fields: [
    { name: 'key', type: "text", required: true },
    { name: 'content', type: "richText", required: true, editor: lexicalEditor({ admin: { placeholder: "Enter content here...", hideGutter: true } }) },
  ]
}