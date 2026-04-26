import { Metadata } from "next";
import RandomImagePicker from "~/components/random/random-image-picker";
import { getPayload } from "~/lib/payload";
import { Media } from "~/payload-types";

export const metadata: Metadata = {
  title: "Random",
};

function isImageMedia(doc: Media) {
  return Boolean(doc.url && doc.mimeType?.startsWith("image"));
}

export default async function RandomPage() {
  const payload = await getPayload();

  const media = await payload.find({
    collection: "media",
    limit: 1000,
    sort: "-createdAt",
  });

  const images = media.docs.filter(isImageMedia);

  return <RandomImagePicker images={images} />;
}
