"use client";

import Image from "next/image";
import { use, useMemo, useState } from "react";
import PageSelector from "~/app/admin/manage/components/page-selector";
import { AspectRatio } from "~/components/ui/aspect-ratio";

const ManageImages = ({
  imagesPromise,
}: {
  imagesPromise: Promise<
    {
      title: string | null;
      date: string;
      location: string;
      page: string;
      imageUrl: string;
      id: string;
      createdAt: string;
    }[]
  >;
}) => {
  const resolvedImages = use(imagesPromise);
  const [selectedPage, setSelectedPage] = useState<undefined | string>();

  const displayedImages = useMemo(
    () =>
      resolvedImages &&
      resolvedImages.filter((image) => image.page === selectedPage),
    [resolvedImages, selectedPage]
  );

  return (
    <div className="w-full">
      <PageSelector setSelectedPage={setSelectedPage} />
      <div className="grid mt-8 gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
        {displayedImages.map((image) => (
          <AspectRatio ratio={1} key={`manage-image-grid-${image.id}`}>
            <Image
              alt="Manage image"
              src={image.imageUrl}
              style={{ objectFit: "cover" }}
              fill
              className="rounded-sm"
            />
          </AspectRatio>
        ))}
      </div>
    </div>
  );
};

export default ManageImages;
