export const dynamic = "force-dynamic";

import { Mrs_Sheppards } from "next/font/google";
import ImageCarousel from "~/components/image-carousel";
import { getImages } from "~/server/db/queries";

const mrsSheppards = Mrs_Sheppards({
  weight: "400",
  subsets: ["latin"],
});

export default async function Home() {
  const allImagesPromise = getImages();
  return (
    <div className="grow">
      <div className="grid [grid-template-areas:'stack']">
        <div className="[grid-area:stack] h-full max-h-[calc(100vh-60px)]">
          <ImageCarousel imagesPromise={allImagesPromise} />
        </div>
        <div className="z-10 [grid-area:stack] bg-slate-800/30 max-h-[calc(100vh-60px)]">
          <div className="h-full flex flex-col justify-center items-center text-background tracking-wide">
            <h1 className={`${mrsSheppards.className} text-8xl text-center`}>
              Victoria Ross
            </h1>
            <p className="text-xl">{"documentary & lifestyle photography"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
