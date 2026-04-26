import ProjectCard from "~/components/projects/project-card";
import { Project } from "~/payload-types";

export default function ProjectCardLayout({
  projects,
}: {
  projects: Project[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {projects.map((project) => (
        <ProjectCard key={`project-card-${project.id}`} project={project} />
      ))}
    </div>
  );
}
