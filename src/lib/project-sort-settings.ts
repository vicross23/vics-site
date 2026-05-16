import { ProjectPageType } from "~/app/models";
import { getPayload } from "~/lib/payload";
import {
  DEFAULT_PROJECT_SORT_ORDER,
  isProjectSortOrder,
} from "~/lib/project-sorting";

export async function getProjectSortOrder(page: ProjectPageType) {
  const payload = await getPayload();
  const settings = await payload.find({
    collection: "settings",
    where: {
      page: {
        equals: page,
      },
    },
    limit: 1,
    pagination: false,
  });

  const sortOrder = settings.docs[0]?.projectSortOrder;

  return isProjectSortOrder(sortOrder) ? sortOrder : DEFAULT_PROJECT_SORT_ORDER;
}
