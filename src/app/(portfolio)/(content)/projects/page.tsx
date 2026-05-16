import { Metadata } from "next";
import { cacheLife, cacheTag } from "next/cache";
import { ProjectPageType } from "~/app/models";
import ProjectCardLayout from "~/components/projects/project-card-layout";
import { getPayload } from "~/lib/payload";
import { getProjectSortOrder } from "~/lib/project-sort-settings";
import { sortProjects } from "~/lib/project-sorting";

export const metadata: Metadata = {
  title: "Projects",
};

export default async function Projects() {
  "use cache";
  cacheTag("projectsPage");
  cacheLife("hours");

  const payload = await getPayload();

  const [content, sortOrder] = await Promise.all([
    payload.find({
      collection: "projects",
      where: {
        page: {
          equals: ProjectPageType.Projects,
        },
      },
    }),
    getProjectSortOrder(ProjectPageType.Projects),
  ]);
  const projects = sortProjects(content.docs, sortOrder);
  return (
    <div className="grow p-10 flex flex-col gap-8">
      <ProjectCardLayout
        projects={projects}
        sourcePage={ProjectPageType.Projects}
      />
    </div>
  );
}
