import { Metadata } from "next";
import { cacheLife, cacheTag } from "next/cache";
import { Suspense } from "react";
import RandomImagePicker from "~/components/random/random-image-picker";
import { Skeleton } from "~/components/ui/skeleton";
import { getPayload } from "~/lib/payload";
import { Media } from "~/payload-types";

export const metadata: Metadata = {
  title: "Random",
};

function isImageMedia(doc: Media) {
  return Boolean(doc.url && doc.mimeType?.startsWith("image"));
}

export default async function RandomPage() {
  "use cache";
  cacheTag("randomPage");
  cacheLife("hours");

  const payload = await getPayload();

  const media = await payload.find({
    collection: "media",
    limit: 1000,
    sort: "-createdAt",
  });

  const images = media.docs.filter(isImageMedia);

  return (
    <Suspense fallback={<Skeleton className="w-full h-full" />}>
      <RandomImagePicker images={images} />
    </Suspense>
  );
}
