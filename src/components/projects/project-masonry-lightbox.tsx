"use client";

import { ArrowLeft, ArrowRight, XIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, type KeyboardEvent } from "react";
import { flushSync } from "react-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "~/components/ui/carousel";
import { Button } from "~/components/ui/button";
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

export type ProjectMasonryImage = Media & { url: string };

const imageSlideVariants = {
  enter: (direction: number) => ({
    x: `${direction * 100}%`,
    opacity: 0,
  }),
  center: {
    x: "0%",
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: `${direction * -100}%`,
    opacity: 0,
  }),
};

type ProjectMasonryLightboxProps = {
  image: ProjectMasonryImage;
  images: ProjectMasonryImage[];
  imageIndex: number;
  projectName: string;
};

export default function ProjectMasonryLightbox({
  image,
  images,
  imageIndex,
  projectName,
}: ProjectMasonryLightboxProps) {
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentImageIndex, setCurrentImageIndex] = useState(imageIndex);
  const [slideDirection, setSlideDirection] = useState(1);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    carouselApi.scrollTo(imageIndex, true);
  }, [carouselApi, imageIndex]);

  useEffect(() => {
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
      queueMicrotask(markLoaded);
    }

    return () => {
      cancelled = true;
      thumbnail.onload = null;
      thumbnail.onerror = null;
    };
  }, [image.url]);

  const currentImage = images[currentImageIndex] ?? image;
  const currentAlt = currentImage.title || `${projectName} image`;
  const imageCount = images.length;

  if (imageCount === 0) {
    return null;
  }

  const resetLightboxImage = () => {
    setSlideDirection(1);
    setCurrentImageIndex(imageIndex);
    carouselApi?.scrollTo(imageIndex, true);
  };

  const prepareCloseAnimation = () => {
    flushSync(resetLightboxImage);
  };

  const showPreviousImage = () => {
    setSlideDirection(-1);
    setCurrentImageIndex((index) => {
      const previousIndex = index === 0 ? imageCount - 1 : index - 1;
      carouselApi?.scrollTo(previousIndex);
      return previousIndex;
    });
  };

  const showNextImage = () => {
    setSlideDirection(1);
    setCurrentImageIndex((index) => {
      const nextIndex = index === imageCount - 1 ? 0 : index + 1;
      carouselApi?.scrollTo(nextIndex);
      return nextIndex;
    });
  };

  const handleLightboxKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (imageCount <= 1) {
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      event.stopPropagation();
      showPreviousImage();
      return;
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      event.stopPropagation();
      showNextImage();
    }
  };

  const alt = image.title || `${projectName} image`;
  const aspectRatio =
    image.width && image.height ? `${image.width} / ${image.height}` : "4 / 3";
  const navButtonClassName =
    "rounded-none size-11 bg-white text-foreground hover:bg-background disabled:pointer-events-none sm:size-10";

  return (
    <MorphingDialog>
      <MorphingDialogTrigger
        className="relative block w-full overflow-hidden focus:outline-hidden"
        aria-label={`Open ${alt}`}
        aria-busy={!thumbnailLoaded}
        style={{ aspectRatio }}
        onClick={resetLightboxImage}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            resetLightboxImage();
          }
        }}
      >
        {!thumbnailLoaded ? (
          <Skeleton className="absolute inset-0 h-full w-full rounded-none" />
        ) : null}
        <MorphingDialogImage
          src={image.url}
          alt={alt}
          className={cn(
            "block h-auto w-full cursor-zoom-in transition-opacity",
            thumbnailLoaded ? "opacity-100" : "opacity-0",
          )}
          loading="lazy"
          onLoad={() => setThumbnailLoaded(true)}
        />
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <MorphingDialogContent
          onCloseStart={prepareCloseAnimation}
          className={cn(
            "relative flex max-h-svh w-[calc(100vw-1rem)] max-w-6xl flex-col items-center gap-3 overflow-visible p-2 sm:max-h-[90vh] sm:w-[min(92vw,72rem)] sm:gap-4 sm:p-6",
            "bg-transparent focus:outline-hidden",
          )}
        >
          <MorphingDialogTitle className="sr-only">
            {currentAlt}
          </MorphingDialogTitle>
          <div
            className="relative flex w-full flex-col items-center gap-3"
            onKeyDownCapture={handleLightboxKeyDown}
          >
            <MorphingDialogClose
              onCloseStart={prepareCloseAnimation}
              className="absolute top-2 right-2 z-10 flex size-7 cursor-pointer items-center justify-center rounded-none bg-background/90 text-foreground shadow-lg transition-opacity hover:opacity-85 focus:ring-2 focus:ring-background focus:ring-offset-2 focus:ring-offset-black focus:outline-hidden sm:-top-3 sm:-right-3"
            >
              <XIcon />
              <span className="sr-only">Close</span>
            </MorphingDialogClose>
            <Carousel
              setApi={setCarouselApi}
              opts={{
                align: "center",
                loop: imageCount > 1,
                startIndex: imageIndex,
                watchDrag: false,
              }}
              onKeyDownCapture={() => undefined}
              className="w-full"
            >
              <div className="grid w-full items-center gap-3 sm:grid-cols-[auto_minmax(0,1fr)_auto]">
                {imageCount > 1 ? (
                  <Button
                    type="button"
                    size="icon"
                    aria-label={`Show previous ${projectName} image`}
                    onClick={showPreviousImage}
                    className={cn(navButtonClassName, "hidden sm:inline-flex")}
                  >
                    <ArrowLeft className="size-5" />
                    <span className="sr-only">Previous slide</span>
                  </Button>
                ) : null}
                <div className="relative flex h-[72svh] w-full items-center justify-center overflow-hidden sm:h-[75vh]">
                  <AnimatePresence custom={slideDirection} initial={false}>
                    <motion.div
                      key={currentImage.id}
                      custom={slideDirection}
                      className="absolute inset-0 flex items-center justify-center"
                      variants={imageSlideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.28, ease: "easeInOut" }}
                    >
                      {currentImage.id === image.id ? (
                        <MorphingDialogImage
                          src={currentImage.url}
                          alt={currentAlt}
                          className="block h-auto max-h-full w-auto max-w-full object-contain"
                        />
                      ) : (
                        <motion.img
                          src={currentImage.url}
                          alt={currentAlt}
                          className="block h-auto max-h-full w-auto max-w-full object-contain"
                          loading="lazy"
                        />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
                {imageCount > 1 ? (
                  <Button
                    type="button"
                    size="icon"
                    aria-label={`Show next ${projectName} image`}
                    onClick={showNextImage}
                    className={cn(navButtonClassName, "hidden sm:inline-flex")}
                  >
                    <ArrowRight className="size-5" />
                    <span className="sr-only">Next slide</span>
                  </Button>
                ) : null}
              </div>
              <CarouselContent
                className="pointer-events-none absolute inset-x-0 top-0 ml-0 h-px overflow-hidden opacity-0"
                aria-hidden="true"
              >
                {images.map((carouselImage) => (
                  <CarouselItem
                    key={carouselImage.id}
                    className="basis-full pl-0"
                  >
                    <div className="h-px w-full" />
                  </CarouselItem>
                ))}
              </CarouselContent>
              {imageCount > 1 ? (
                <div className="mt-3 flex items-center justify-center gap-3 sm:hidden">
                  <Button
                    type="button"
                    size="icon"
                    aria-label={`Show previous ${projectName} image`}
                    onClick={showPreviousImage}
                    className={navButtonClassName}
                  >
                    <ArrowLeft />
                    <span className="sr-only">Previous slide</span>
                  </Button>
                  <p
                    className="min-w-16 text-center text-sm text-white/90"
                    aria-live="polite"
                  >
                    {currentImageIndex + 1} / {imageCount}
                  </p>
                  <Button
                    type="button"
                    size="icon"
                    aria-label={`Show next ${projectName} image`}
                    onClick={showNextImage}
                    className={navButtonClassName}
                  >
                    <ArrowRight />
                    <span className="sr-only">Next slide</span>
                  </Button>
                </div>
              ) : null}
            </Carousel>
          </div>
          {currentImage.title && (
            <MorphingDialogDescription
              className="max-w-3xl text-center text-sm text-white/90"
              disableLayoutAnimation
            >
              {currentImage.title}
            </MorphingDialogDescription>
          )}
        </MorphingDialogContent>
      </MorphingDialogContainer>
    </MorphingDialog>
  );
}
