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
    (image) => image.page === "home" && isSmall === image.isSmall
  );

  return (
    <div className="w-full min-h-screen">
      <Carousel
        className="max-w-screen min-h-screen"
        opts={{ loop: true, watchDrag: true }}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
      >
        <CarouselContent className="justify-start min-h-[calc(100vh-60px)]">
          {images.map((image, index) => (
            <CarouselItem key={index} className="min-w-full min-h-full">
              <div className="min-h-full relative">
                <Image alt="Image carousel image" src={image.imageUrl} fill />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
