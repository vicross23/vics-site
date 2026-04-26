import { JSXConvertersFunction } from "@payloadcms/richtext-lexical/react";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";
import { cn } from "~/lib/utils";
import { Media } from "~/payload-types";

function isMediaUpload(value: unknown): value is Media {
  return typeof value === "object" && value !== null && "url" in value;
}

export const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  heading: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({
      nodes: node.children,
    });

    const className = cn("text-balance", {
      "text-5xl md:text-3xl leading-[0.95]": node.tag === "h1",
      "text-3xl md:text-4xl font-medium": node.tag === "h2",
      "text-2xl md:text-3xl font-medium": node.tag === "h3",
      "text-xl md:text-2xl font-medium": node.tag === "h4",
      "text-lg font-medium": node.tag === "h5",
      "text-base font-medium uppercase tracking-[0.12em]": node.tag === "h6",
    });

    switch (node.tag) {
      case "h1":
        return <h1 className={className}>{children}</h1>;
      case "h2":
        return <h2 className={className}>{children}</h2>;
      case "h3":
        return <h3 className={className}>{children}</h3>;
      case "h4":
        return <h4 className={className}>{children}</h4>;
      case "h5":
        return <h5 className={className}>{children}</h5>;
      case "h6":
        return <h6 className={className}>{children}</h6>;
      default:
        return <p className={className}>{children}</p>;
    }
  },
  upload: ({ node }) => {
    if (!isMediaUpload(node.value)) {
      return null;
    }

    const upload = node.value;
    if (!upload.mimeType?.startsWith("image") || !upload.url) {
      return null;
    }

    const alt =
      typeof node.fields?.alt === "string" ? node.fields.alt : upload.title;

    return (
      <div className="mx-auto w-full max-w-md">
        <AspectRatio ratio={4 / 5}>
          <Image
            src={upload.url}
            alt={alt}
            fill
            sizes="(min-width: 768px) 28rem, 100vw"
            className="object-cover"
          />
        </AspectRatio>
      </div>
    );
  },
});
