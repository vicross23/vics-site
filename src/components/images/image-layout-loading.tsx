import { Skeleton } from "~/components/ui/skeleton";

const ImageLayoutLoading = () => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {[1, 2, 3].map((_, index) => (
        <div key={`image-layout-loading-${index}`}>
          <div
            key={`image-layout-item-${index}`}
            className="flex flex-col md:grid md:grid-cols-8 lg:grid-cols-12 gap-4"
          >
            <div className="md:col-span-5 lg:col-span-10">
              <Skeleton className="h-72 lg:h-96 lg:w-2xl" />
            </div>
            <div className="flex flex-col justify-end gap-1 md:col-start-7 lg:col-start-auto">
              <Skeleton className="w-16 h-4" />
              <Skeleton className="w-32 h-4" />
              <Skeleton className="w-32 h-4" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageLayoutLoading;
