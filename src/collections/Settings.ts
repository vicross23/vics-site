import { revalidateTag } from "next/cache";
import { CollectionAfterChangeHook, CollectionConfig } from "payload";
import { ProjectPageType } from "~/app/models";
import {
  DEFAULT_PROJECT_SORT_ORDER,
  projectSortOptions,
} from "~/lib/project-sorting";

const pageCacheTags = {
  [ProjectPageType.Projects]: "projectsPage",
  [ProjectPageType.Personal]: "personalPage",
} satisfies Record<ProjectPageType, string>;

function isProjectPageType(value: unknown): value is ProjectPageType {
  return (
    typeof value === "string" &&
    Object.values(ProjectPageType).includes(value as ProjectPageType)
  );
}

const revalidateProjectListPages: CollectionAfterChangeHook = ({
  doc,
  previousDoc,
}) => {
  const pagesToRevalidate = new Set<ProjectPageType>();

  if (
    doc.projectSortOrder !== previousDoc?.projectSortOrder ||
    doc.page !== previousDoc?.page
  ) {
    if (isProjectPageType(doc.page)) {
      pagesToRevalidate.add(doc.page);
    }

    if (isProjectPageType(previousDoc?.page)) {
      pagesToRevalidate.add(previousDoc.page);
    }
  }

  pagesToRevalidate.forEach((page) =>
    revalidateTag(pageCacheTags[page], { expire: 0 })
  );

  return doc;
};

export const Settings: CollectionConfig = {
  slug: "settings",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "page",
  },
  hooks: {
    afterChange: [revalidateProjectListPages],
  },
  fields: [
    {
      name: "page",
      type: "select",
      options: [
        { label: "Projects", value: ProjectPageType.Projects },
        { label: "Personal", value: ProjectPageType.Personal },
      ],
      required: true,
      unique: true,
    },
    {
      name: "projectSortOrder",
      type: "select",
      options: [...projectSortOptions],
      required: true,
      defaultValue: DEFAULT_PROJECT_SORT_ORDER,
    },
  ],
};
