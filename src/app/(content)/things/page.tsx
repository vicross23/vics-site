export const dynamic = "force-dynamic";
import { Metadata } from "next";
import { Suspense } from "react";
import ImageLayout from "~/app/(content)/components/image-layout";
import ImageLayoutLoading from "~/app/(content)/components/image-layout-loading";
import { getImages } from "~/server/db/queries";

export const metadata: Metadata = {
  title: "Things",
};

export default async function Things() {
  const allImages = await getImages();

  const filteredImages = allImages.filter((image) => image.page === "things");

  return (
    <div className="grow p-10 flex flex-col gap-8">
      <Suspense fallback={<ImageLayoutLoading />}>
        <ImageLayout images={filteredImages} />
      </Suspense>
    </div>
  );
}
