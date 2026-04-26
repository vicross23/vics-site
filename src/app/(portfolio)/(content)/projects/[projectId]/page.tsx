import { format, parseISO } from "date-fns";
import ProjectMasonryGallery from "~/components/projects/project-masonry-gallery";
import { getPayload } from "~/lib/payload";
import { Media } from "~/payload-types";

type ProjectPageProps = {
  params: Promise<{
    projectId: string;
  }>;
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { projectId } = await params;
  const payload = await getPayload();

  const project = await payload.findByID({
    disableErrors: true,
    collection: "projects",
    id: projectId,
    depth: 2,
  });

  if (!project) {
    return (
      <div className="flex w-full flex-1 flex-col items-center justify-center gap-6 px-6 py-10">
        That project was not found
      </div>
    );
  }

  const images =
    project.images?.filter(
      (image): image is Media =>
        typeof image === "object" && image !== null && Boolean(image.url),
    ) ?? [];

  return (
    <div className="flex w-full flex-1 flex-col items-center justify-start gap-8 mb-20 px-2 md:px-0 max-w-4xl mx-auto text-center">
      <h1 className="text-2xl">
        {project.name}
        {" // " + format(parseISO(project.date), "yyyy")}
      </h1>
      {project?.description && (
        <p className="max-w-2xl mx-auto">{project.description}</p>
      )}
      <ProjectMasonryGallery images={images ?? []} projectName={project.name} />
    </div>
  );
}
