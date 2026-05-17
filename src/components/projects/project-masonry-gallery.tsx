import ProjectMasonryLightbox, {
  type ProjectMasonryImage,
} from "~/components/projects/project-masonry-lightbox";
import { Media } from "~/payload-types";

type ProjectMasonryGalleryProps = {
  images: Media[];
  projectName: string;
};

function hasImageUrl(image: Media): image is ProjectMasonryImage {
  return Boolean(image.url);
}

export default function ProjectMasonryGallery({
  images,
  projectName,
}: ProjectMasonryGalleryProps) {
  const galleryImages = images.filter(hasImageUrl);

  if (galleryImages.length === 0) {
    return null;
  }

  return (
    <div className="columns-1 gap-4 pt-4 sm:columns-2">
      {galleryImages.map((image, index) => (
        <figure
          key={image.id}
          className="mb-4 break-inside-avoid overflow-hidden"
        >
          <ProjectMasonryLightbox
            image={image}
            images={galleryImages}
            imageIndex={index}
            projectName={projectName}
          />
        </figure>
      ))}
    </div>
  );
}
