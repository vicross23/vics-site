import { Suspense } from "react";
import ImageLayout from "~/app/(content)/components/image-layout";
import { getImages } from "~/server/db/queries";

export default async function Places() {
  const allImages = await getImages();

  const filteredImages = allImages.filter((image) => image.page === "places");

  return (
    <div className="grow p-10 flex flex-col gap-8">
      <Suspense fallback={<div>loading images...</div>}>
        <ImageLayout images={filteredImages} />
      </Suspense>
    </div>
  );
}
