import { RichText } from "@payloadcms/richtext-lexical/react";
import { Metadata } from "next";
import { converters } from "~/components/payload-converters";
import { getPayload } from "~/lib/payload";

export const metadata: Metadata = {
  title: "About",
};

export const dynamic = "force-dynamic";

export default async function About() {
  const payload = await getPayload();

  const content = await payload.find({
    collection: "content",
    where: {
      key: {
        contains: "ABOUT_ME_",
      },
    },
  });

  return (
    <div className="grow flex flex-col justify-center items-center gap-16 w-full p-10 text-center mx-auto">
      <RichText data={content?.docs[0]?.content} converters={converters} />
    </div>
  );
}
