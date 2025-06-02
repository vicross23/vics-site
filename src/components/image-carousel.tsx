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
  const images = use(imagesPromise);

  return (
    <div className="w-full grow">
      <Carousel
        className="w-auto max-w-screen"
        opts={{ loop: true, watchDrag: true }}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
      >
        <CarouselContent className="justify-start">
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
