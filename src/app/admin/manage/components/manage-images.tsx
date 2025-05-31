"use client";

import { use, useMemo, useState } from "react";
import EditableImage from "~/app/admin/manage/components/editable-image";
import PageSelector from "~/app/admin/manage/components/page-selector";

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
      <div className="grid mt-8 gap-4 grid-cols-1 min-[500px]:grid-cols-2 min-[750px]:grid-cols-3 w-full">
        {displayedImages.map((image) => (
          <EditableImage key={`manage-image-grid-${image.id}`} image={image} />
        ))}
      </div>
    </div>
  );
};

export default ManageImages;
