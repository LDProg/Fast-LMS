import { Skeleton } from "@nextui-org/react";

export default function Loading() {
  return (
    <div className="p-6 space-y-4">
      <div className="h-[80px] w-full">
        <Skeleton
          disableAnimation
          className="h-full w-full  rounded-lg animate-pulse bg-primary/10"
        />
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 mt-3">
        <Skeleton
          disableAnimation
          className="h-[370px] rounded-xl animate-pulse bg-primary/10"
        />

        <Skeleton
          disableAnimation
          className="h-[370px] rounded-xl animate-pulse bg-primary/10"
        />

        <Skeleton
          disableAnimation
          className="h-[370px] rounded-xl animate-pulse bg-primary/10"
        />

        <Skeleton
          disableAnimation
          className="h-[370px] rounded-xl animate-pulse bg-primary/10"
        />

        <Skeleton
          disableAnimation
          className="h-[370px] rounded-xl animate-pulse bg-primary/10"
        />

        <Skeleton
          disableAnimation
          className="h-[370px] rounded-xl animate-pulse bg-primary/10"
        />

        <Skeleton
          disableAnimation
          className="h-[370px] rounded-xl animate-pulse bg-primary/10"
        />

        <Skeleton
          disableAnimation
          className="h-[370px] rounded-xl animate-pulse bg-primary/10"
        />
      </div>
    </div>
  );
}
