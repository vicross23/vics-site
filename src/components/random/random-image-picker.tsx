"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Button } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";
import { Media } from "~/payload-types";

type RandomImagePickerProps = {
  images: Media[];
};

const HEADER_HEIGHT = "3.75rem";
const IMAGE_HEIGHT = `calc((100svh - ${HEADER_HEIGHT}) * 0.8)`;

function getRandomImage(images: Media[], currentId?: string) {
  if (images.length === 0) {
    return null;
  }

  if (images.length === 1) {
    return images[0];
  }

  const candidates = currentId
    ? images.filter((image) => image.id !== currentId)
    : images;

  return candidates[Math.floor(Math.random() * candidates.length)] ?? images[0];
}

export default function RandomImagePicker({ images }: RandomImagePickerProps) {
  const [selectedImage, setSelectedImage] = useState<Media | null>(null);
  const [incomingImage, setIncomingImage] = useState<Media | null>(null);
  const [imageLoading, setImageLoading] = useState(false);

  const buttonText = selectedImage ? "show me another" : "show me something";
  const hasImages = images.length > 0;

  const imageAlt = useMemo(() => {
    if (!selectedImage) {
      return "";
    }

    return selectedImage.title || "Random media image";
  }, [selectedImage]);

  const incomingImageAlt = useMemo(() => {
    if (!incomingImage) {
      return "";
    }

    return incomingImage.title || "Random media image";
  }, [incomingImage]);

  return (
    <div
      className="flex w-full flex-1 flex-col items-center justify-center gap-6 px-6 py-10"
      style={{ minHeight: `calc(100svh - ${HEADER_HEIGHT})` }}
    >
      {selectedImage?.url || incomingImage?.url ? (
        <div
          className="relative flex w-full items-center justify-center"
          style={{ height: IMAGE_HEIGHT }}
        >
          {imageLoading && !selectedImage?.url ? (
            <Skeleton className="absolute inset-0 mx-auto h-full w-full max-w-full rounded-none" />
          ) : null}
          {selectedImage?.url ? (
            <Image
              key={selectedImage.id}
              src={selectedImage.url}
              alt={imageAlt}
              width={selectedImage.width ?? 1600}
              height={selectedImage.height ?? 1200}
              className={`h-full w-auto max-w-full object-contain transition-opacity ${
                imageLoading && !incomingImage ? "opacity-0" : "opacity-100"
              }`}
              priority
              onLoad={() => {
                if (!incomingImage) {
                  setImageLoading(false);
                }
              }}
            />
          ) : null}
          {incomingImage?.url ? (
            <Image
              key={incomingImage.id}
              src={incomingImage.url}
              alt={incomingImageAlt}
              width={incomingImage.width ?? 1600}
              height={incomingImage.height ?? 1200}
              className="absolute inset-0 m-auto h-full w-auto max-w-full object-contain opacity-0 pointer-events-none"
              priority
              onLoad={() => {
                setSelectedImage(incomingImage);
                setIncomingImage(null);
                setImageLoading(false);
              }}
            />
          ) : null}
        </div>
      ) : null}

      <Button
        type="button"
        onClick={() => {
          const currentImageId = incomingImage?.id ?? selectedImage?.id;
          const nextImage = getRandomImage(images, currentImageId);

          if (!nextImage) {
            return;
          }

          setImageLoading(Boolean(nextImage?.url));

          if (!selectedImage) {
            setSelectedImage(nextImage);
            return;
          }

          setIncomingImage(nextImage);
        }}
        className="transition-colors hover:bg-blue-600! hover:text-white cursor-pointer rounded-none active:scale-98"
        disabled={!hasImages || imageLoading}
        variant="ghost"
      >
        {hasImages ? buttonText : "no images available"}
      </Button>
    </div>
  );
}
