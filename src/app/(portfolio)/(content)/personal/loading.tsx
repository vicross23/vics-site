import { Skeleton } from "~/components/ui/skeleton";

export default function PersonalLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Skeleton className="h-full w-full" />
      <Skeleton className="h-full w-full" />
      <Skeleton className="h-full w-full" />
      <Skeleton className="h-full w-full" />
    </div>
  );
}
