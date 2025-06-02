"use client";

import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { use } from "react";

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
      id: string;
      date: string;
      location: string;
      page: string;
      imageUrl: string;
      createdAt: string;
    }[]
  >;
}) => {
  const images = use(imagesPromise).filter((image) => image.page === "home");

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
            <CarouselItem key={index}>
              <div className="justify-start h-[600px] w-[1000px]">
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
