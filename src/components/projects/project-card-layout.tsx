import { ProjectPageType } from "~/app/models";
import ProjectCard from "~/components/projects/project-card";
import type { Project } from "~/payload-types";

export default function ProjectCardLayout({
  projects,
  sourcePage,
}: {
  projects: Project[];
  sourcePage: ProjectPageType;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {projects.map((project) => (
        <ProjectCard
          key={`project-card-${project.id}`}
          project={project}
          sourcePage={sourcePage}
        />
      ))}
    </div>
  );
}
