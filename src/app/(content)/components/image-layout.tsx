import Image from "next/image";

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
          className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4"
        >
          <div className="col-span-3 md:col-span-6 lg:col-span-10">
            <div className="flex justify-start h-[660px]">
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
          <div className="flex flex-col justify-end">
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
