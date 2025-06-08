import { Metadata } from "next";
import { Mrs_Sheppards } from "next/font/google";
import Image from "next/image";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import { cn } from "~/lib/utils";
import { getImages } from "~/server/db/queries";

const mrsSheppards = Mrs_Sheppards({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "About",
};

export default async function About() {
  const allImages = await getImages();

  const aboutImage = allImages.filter((image) => image.page === "about")[0];

  return (
    <div className="grow flex flex-col justify-center items-center gap-16 w-full bg-[#F1FF85] p-10 text-center text-[#0037CF]">
      <div className="grid grid-cols-1 min-[650px]:grid-cols-4 gap-5 mx-auto">
        <div className="min-[650px]:col-span-2 relative h-full w-full max-w-md mx-auto">
          {aboutImage?.imageUrl && (
            <AspectRatio ratio={1}>
              <Image
                src={aboutImage.imageUrl}
                alt="Image of Victoria Ross"
                fill
                style={{ objectFit: "cover" }}
              />
            </AspectRatio>
          )}
        </div>
        <div className="col-span-1 min-[650px]:col-span-2 text-center min-[650px]:text-left flex flex-col gap-5 text-lg md:text-xl">
          <h1 className={cn("text-5xl font-bold", mrsSheppards.className)}>
            Nice to meet you!
          </h1>
          <p>
            My name is Victoria and I&apos;m a photographer based in Vancouver,
            Canada.
          </p>
          <p>
            My work aims to capture the fleeting beauty of the everyday.
            I&apos;m drawn to the energy of youth, the atmosphere of nightlife,
            and the in-between spaces we pass through and exist in.{" "}
          </p>
          <p>
            My influences are artist like Ryan McGinley, Wolfgang Tillmans, and
            Jordan Curtis Hughes - photographers who blur the line between
            documentation and art, and who embrace the imperfection of human
            connection and experiences.{" "}
          </p>
          <p>
            I have a documentary approach to shooting, creating images that are
            intimate, observational, and candid.{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
