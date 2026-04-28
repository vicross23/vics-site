"use client";

import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { use, useState } from "react";
import useBreakpoint from "use-breakpoint";
import { CAROUSEL_BREAKPOINTS } from "~/components/constants";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "~/components/ui/carousel";
import { Skeleton } from "~/components/ui/skeleton";

type CarouselImage = {
  title: string | null;
  isSmall: boolean | null;
  id: string;
  date: string;
  location: string;
  page: string;
  imageUrl: string;
  createdAt: string;
};

function ImageCarouselItem({ image }: { image: CarouselImage }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      className="relative min-h-[calc(100vh-84px)] overflow-hidden md:min-h-[calc(100vh-108px)]"
      aria-busy={!imageLoaded}
    >
      {!imageLoaded ? (
        <Skeleton className="absolute inset-0 h-full w-full rounded-none" />
      ) : null}
      <Image
        alt={image.title || "Image carousel image"}
        src={image.imageUrl}
        fill
        sizes="100vw"
        className={`object-cover transition-opacity ${
          imageLoaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setImageLoaded(true)}
      />
    </div>
  );
}

const ImageCarousel = ({
  imagesPromise,
}: {
  imagesPromise: Promise<CarouselImage[]>;
}) => {
  const { breakpoint } = useBreakpoint(CAROUSEL_BREAKPOINTS, "large");

  const isSmall = breakpoint === "small";

  const images = use(imagesPromise).filter(
    (image) => image.page === "home" && isSmall === image.isSmall,
  );

  return (
    <div className="w-full min-h-[calc(100vh-60px)] bg-background p-3 md:p-6">
      <Carousel
        className="max-w-screen min-h-[calc(100vh-84px)] md:min-h-[calc(100vh-108px)]"
        opts={{ loop: true, watchDrag: true }}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
      >
        <CarouselContent className="ml-0 justify-start min-h-[calc(100vh-84px)] md:min-h-[calc(100vh-108px)]">
          {images.map((image) => (
            <CarouselItem
              key={image.id}
              className="min-w-full min-h-[calc(100vh-84px)] pl-0 md:min-h-[calc(100vh-108px)]"
            >
              <ImageCarouselItem image={image} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
