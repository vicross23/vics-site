import Image from "next/image";
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
          <Image
            src={image.url!}
            alt={image.title || `${projectName} image`}
            width={image.width ?? 1600}
            height={image.height ?? 1200}
            className="h-auto w-full"
          />
        </figure>
      ))}
    </div>
  );
}
