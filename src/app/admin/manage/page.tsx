import { Suspense } from "react";
import ManageImages from "~/app/admin/manage/components/manage-images";
import { getImages } from "~/server/db/queries";

const AdminManagePage = async () => {
  const imagesPromise = getImages();

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Suspense fallback={<div>Loading images...</div>}>
        <ManageImages imagesPromise={imagesPromise} />
      </Suspense>
    </div>
  );
};
export default AdminManagePage;
