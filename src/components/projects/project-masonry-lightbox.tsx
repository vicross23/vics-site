"use client";

import { XIcon } from "lucide-react";
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
  if (!image.url) {
    return null;
  }

  const alt = image.title || `${projectName} image`;

  return (
    <MorphingDialog>
      <MorphingDialogTrigger
        className="block w-full overflow-hidden focus:outline-hidden"
        aria-label={`Open ${alt}`}
      >
        <MorphingDialogImage
          src={image.url}
          alt={alt}
          className="h-auto w-full cursor-zoom-in"
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
            <MorphingDialogClose className="absolute top-0 -right-7 z-10 flex size-5 items-center justify-center rounded-full bg-white text-black shadow-lg transition-opacity hover:opacity-85 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black focus:outline-hidden cursor-pointer">
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
