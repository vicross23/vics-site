import ProjectMasonryLightbox from "~/components/projects/project-masonry-lightbox";
import { Media } from "~/payload-types";

type ProjectMasonryGalleryProps = {
  images: Media[];
  projectName: string;
};

export default function ProjectMasonryGallery({
  images,
  projectName,
}: ProjectMasonryGalleryProps) {
  if (images.length === 0) {
    return null;
  }

  return (
    <div className="columns-1 gap-4 pt-4 sm:columns-2">
      {images.map((image) => (
        <figure
          key={image.id}
          className="mb-4 break-inside-avoid overflow-hidden"
        >
          <ProjectMasonryLightbox image={image} projectName={projectName} />
        </figure>
      ))}
    </div>
  );
}
