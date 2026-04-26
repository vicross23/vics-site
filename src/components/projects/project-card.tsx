import { format, parseISO } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import { Media, Project } from "~/payload-types";

function isMediaUpload(value: Project["coverImage"]): value is Media {
  return typeof value === "object" && value !== null && "url" in value;
}

export default function ProjectCard({ project }: { project: Project }) {
  const coverImage = isMediaUpload(project.coverImage)
    ? project.coverImage
    : null;

  return (
    <Link href={`/projects/${project.id}`}>
      <div className="w-full">
        <AspectRatio ratio={4 / 3}>
          <div className="group relative h-full w-full overflow-hidden">
            {coverImage?.url ? (
              <Image
                src={coverImage.url}
                alt={coverImage.title || project.name}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
            ) : (
              <div className="h-full w-full bg-black/10" />
            )}

            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/50">
              <p className="px-4 text-center text-lg font-extralight text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {`${project.name} // ${format(parseISO(project.date), "yyyy")}`}
              </p>
            </div>
          </div>
        </AspectRatio>
      </div>
    </Link>
  );
}
