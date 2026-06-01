"use client";

import { format, parseISO } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ProjectPageType } from "~/app/models";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import { Skeleton } from "~/components/ui/skeleton";
import { Media, Project } from "~/payload-types";

function isMediaUpload(value: Project["coverImage"]): value is Media {
  return typeof value === "object" && value !== null && "url" in value;
}

export default function ProjectCard({
  project,
  sourcePage,
}: {
  project: Project;
  sourcePage?: ProjectPageType;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const coverImage = isMediaUpload(project.coverImage)
    ? project.coverImage
    : null;
  const projectHref =
    sourcePage === ProjectPageType.Personal
      ? `/projects/${project.id}?from=personal`
      : `/projects/${project.id}`;

  return (
    <Link href={projectHref}>
      <div className="w-full">
        <AspectRatio ratio={4 / 3}>
          <div
            className="group relative h-full w-full overflow-hidden"
            aria-busy={coverImage?.url ? !imageLoaded : undefined}
          >
            {coverImage?.url ? (
              <>
                {!imageLoaded ? (
                  <Skeleton className="absolute inset-0 h-full w-full rounded-none" />
                ) : null}
                <Image
                  src={coverImage.url}
                  alt={coverImage.title || project.name}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className={`object-cover transform-gpu transition-transform duration-300 ease-out scale-[1.02] lg:scale-100 lg:group-hover:scale-[1.02] ${
                    imageLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  onLoad={() => setImageLoaded(true)}
                />
              </>
            ) : (
              <div className="h-full w-full bg-black/10" />
            )}

            <div className="absolute inset-0 flex items-center justify-center bg-black/50 transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] lg:bg-black/0 lg:group-hover:bg-black/50">
              <p className="px-4 text-center text-lg font-extralight text-white opacity-100 transition-opacity duration-300 ease-out lg:opacity-0 lg:group-hover:opacity-100">
                {`${project.name} // ${format(parseISO(project.date), "yyyy")}`}
              </p>
            </div>
          </div>
        </AspectRatio>
      </div>
    </Link>
  );
}
