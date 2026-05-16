import { ProjectSortOrder } from "~/app/models";
import type { Project } from "~/payload-types";

export const DEFAULT_PROJECT_SORT_ORDER = ProjectSortOrder.DateDesc;

export const projectSortOptions = [
  { label: "Newest first", value: ProjectSortOrder.DateDesc },
  { label: "Oldest first", value: ProjectSortOrder.DateAsc },
  { label: "Name A-Z", value: ProjectSortOrder.NameAsc },
  { label: "Name Z-A", value: ProjectSortOrder.NameDesc },
] as const;

const projectSortOrderValues = new Set<ProjectSortOrder>(
  projectSortOptions.map((option) => option.value),
);

export function isProjectSortOrder(value: unknown): value is ProjectSortOrder {
  return (
    typeof value === "string" &&
    projectSortOrderValues.has(value as ProjectSortOrder)
  );
}

export function sortProjects(
  projects: Project[],
  sortOrder: ProjectSortOrder,
) {
  return [...projects].sort((a, b) => {
    switch (sortOrder) {
      case ProjectSortOrder.DateAsc:
        return Date.parse(a.date) - Date.parse(b.date);
      case ProjectSortOrder.NameAsc:
        return a.name.localeCompare(b.name);
      case ProjectSortOrder.NameDesc:
        return b.name.localeCompare(a.name);
      case ProjectSortOrder.DateDesc:
      default:
        return Date.parse(b.date) - Date.parse(a.date);
    }
  });
}
