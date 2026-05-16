import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { revalidateTag } from "next/cache";
import {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  CollectionConfig,
} from "payload";

const revalidateContent: CollectionAfterChangeHook = ({ doc }) => {
  revalidateTag("content", { expire: 0 });

  return doc;
};

const revalidateDeletedContent: CollectionAfterDeleteHook = ({ doc }) => {
  revalidateTag("content", { expire: 0 });

  return doc;
};

export const Content: CollectionConfig = {
  slug: "content",
  admin: {
    useAsTitle: "key",
  },
  hooks: {
    afterChange: [revalidateContent],
    afterDelete: [revalidateDeletedContent],
  },
  fields: [
    { name: "key", type: "text", required: true },
    {
      name: "content",
      type: "richText",
      required: true,
      editor: lexicalEditor({
        admin: { placeholder: "Enter content here...", hideGutter: true },
      }),
    },
  ],
};