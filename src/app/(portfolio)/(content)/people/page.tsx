export const dynamic = "force-dynamic";

import { Metadata } from "next";
import { Suspense } from "react";
import ImageLayout from "~/components/images/image-layout";
import ImageLayoutLoading from "~/components/images/image-layout-loading";
import { getImages } from "~/server/db/queries";

export const metadata: Metadata = {
  title: "People",
};

export default async function People() {
  const allImages = await getImages();

  const filteredImages = allImages.filter((image) => image.page === "people");

  return (
    <div className="grow p-10 flex flex-col gap-8">
      <Suspense fallback={<ImageLayoutLoading />}>
        <ImageLayout images={filteredImages} />
      </Suspense>
    </div>
  );
}
