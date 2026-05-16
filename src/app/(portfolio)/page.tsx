import { RichText } from "@payloadcms/richtext-lexical/react";
import { cacheLife, cacheTag } from "next/cache";
import ImageCarousel from "~/components/images/image-carousel";
import { converters } from "~/components/payload-converters";
import { getPayload } from "~/lib/payload";
import { getImages } from "~/server/db/queries";

export default async function Home() {
  "use cache";
  cacheTag("homePage", "content");
  cacheLife("hours");
  const payload = await getPayload();

  const content = await payload.find({
    collection: "content",
    where: {
      key: {
        contains: "HOME_PAGE",
      },
    },
  });
  const allImagesPromise = getImages();
  return (
    <div className="grow">
      <div className="grid [grid-template-areas:'stack']">
        <div className="[grid-area:stack] h-full max-h-[calc(100vh-60px)]">
          <ImageCarousel imagesPromise={allImagesPromise} />
        </div>
        <div className="z-10 [grid-area:stack] max-h-[calc(100vh-60px)] p-3 md:p-6">
          <div className="h-full bg-slate-800/30 flex flex-col justify-center items-center text-background tracking-wide">
            <RichText
              data={content?.docs[0]?.content}
              converters={converters}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
