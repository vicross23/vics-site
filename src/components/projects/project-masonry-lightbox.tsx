"use client";

import { XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Skeleton } from "~/components/ui/skeleton";
import { cn } from "~/lib/utils";
import { Media } from "~/payload-types";
import {
  MorphingDialog,
  MorphingDialogClose,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogDescription,
  MorphingDialogImage,
  MorphingDialogTitle,
  MorphingDialogTrigger,
} from "~/components/ui/morphing-dialog";

type ProjectMasonryLightboxProps = {
  image: Media;
  projectName: string;
};

export default function ProjectMasonryLightbox({
  image,
  projectName,
}: ProjectMasonryLightboxProps) {
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false);

  useEffect(() => {
    if (!image.url) {
      return;
    }

    setThumbnailLoaded(false);

    let cancelled = false;
    const thumbnail = new Image();
    const markLoaded = () => {
      if (!cancelled) {
        setThumbnailLoaded(true);
      }
    };

    thumbnail.onload = markLoaded;
    thumbnail.onerror = markLoaded;
    thumbnail.src = image.url;

    if (thumbnail.complete) {
      markLoaded();
    }

    return () => {
      cancelled = true;
      thumbnail.onload = null;
      thumbnail.onerror = null;
    };
  }, [image.url]);

  if (!image.url) {
    return null;
  }

  const alt = image.title || `${projectName} image`;
  const aspectRatio =
    image.width && image.height ? `${image.width} / ${image.height}` : "4 / 3";

  return (
    <MorphingDialog>
      <MorphingDialogTrigger
        className="relative block w-full overflow-hidden focus:outline-hidden"
        aria-label={`Open ${alt}`}
        aria-busy={!thumbnailLoaded}
        style={{ aspectRatio }}
      >
        {!thumbnailLoaded ? (
          <Skeleton className="absolute inset-0 h-full w-full rounded-none" />
        ) : null}
        <MorphingDialogImage
          src={image.url}
          alt={alt}
          className={cn(
            "block h-auto w-full cursor-zoom-in transition-opacity",
            thumbnailLoaded ? "opacity-100" : "opacity-0"
          )}
          loading="lazy"
          onLoad={() => setThumbnailLoaded(true)}
        />
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <MorphingDialogContent
          className={cn(
            "relative flex max-h-[90vh] w-full max-w-fit flex-col items-center gap-4 overflow-visible p-4 sm:p-6",
            "bg-transparent focus:outline-hidden"
          )}
        >
          <MorphingDialogTitle className="sr-only">{alt}</MorphingDialogTitle>
          <div className="relative flex max-h-[75vh] max-w-fit items-center justify-center">
            <MorphingDialogClose className="absolute top-2 right-2 z-10 flex size-5 cursor-pointer items-center justify-center rounded-full bg-white text-black shadow-lg transition-opacity hover:opacity-85 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black focus:outline-hidden md:top-0 md:-right-7">
              <XIcon className="size-4" />
              <span className="sr-only">Close</span>
            </MorphingDialogClose>
            <MorphingDialogImage
              src={image.url}
              alt={alt}
              className="block h-auto max-h-[75vh] w-auto max-w-full object-contain"
            />
          </div>
          {image.title && (
            <MorphingDialogDescription
              className="max-w-3xl text-center text-sm text-white/90"
              disableLayoutAnimation
            >
              {image.title}
            </MorphingDialogDescription>
          )}
        </MorphingDialogContent>
      </MorphingDialogContainer>
    </MorphingDialog>
  );
}
