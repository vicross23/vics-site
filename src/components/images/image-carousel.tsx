"use client";

import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { use } from "react";
import useBreakpoint from "use-breakpoint";
import { CAROUSEL_BREAKPOINTS } from "~/components/constants";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "~/components/ui/carousel";

const ImageCarousel = ({
  imagesPromise,
}: {
  imagesPromise: Promise<
    {
      title: string | null;
      isSmall: boolean | null;
      id: string;
      date: string;
      location: string;
      page: string;
      imageUrl: string;
      createdAt: string;
    }[]
  >;
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
          {images.map((image, index) => (
            <CarouselItem
              key={index}
              className="min-w-full min-h-[calc(100vh-84px)] pl-0 md:min-h-[calc(100vh-108px)]"
            >
              <div className="relative min-h-[calc(100vh-84px)] overflow-hidden md:min-h-[calc(100vh-108px)]">
                <Image
                  alt="Image carousel image"
                  src={image.imageUrl}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  // unoptimized
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
