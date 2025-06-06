import Image from "next/image";
import { cn } from "~/lib/utils";

const ImageLayout = ({
  images,
}: {
  images: {
    title: string | null;
    date: string;
    location: string;
    page: string;
    imageUrl: string;
    id: string;
    createdAt: string;
  }[];
}) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {images.map((image, index) => (
        <div
          key={`image-layout-item-${index}`}
          className="flex flex-col md:grid md:grid-cols-8 lg:grid-cols-12 gap-4"
        >
          <div className="col-span-3 md:col-span-6 lg:col-span-10">
            <div className="flex justify-start h-[330px] md:h-[440px] lg:h-[550px] xl:h-[660px]">
              <Image
                alt="Manage image"
                src={image.imageUrl}
                style={{ objectFit: "contain" }}
                width={50}
                height={50}
                priority
                layout="responsive"
                className="max-w-fit"
              />
            </div>
          </div>
          <div
            className={cn(
              "flex flex-col justify-end col-span-2",
              index !== images.length - 1 && "border-b pb-4 md:border-0 md:pb-0"
            )}
          >
            {image?.title && <p>{image.title}</p>}
            <p>{image.location}</p>
            <p>{image.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageLayout;
