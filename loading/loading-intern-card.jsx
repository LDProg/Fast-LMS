import { Card, Skeleton } from "@nextui-org/react";

export const LoadingInternCard = () => {
  return (
    <Card
      className="w-full h-full flex items-center justify-center space-y-5 p-4"
      radius="lg"
    >
      <div>
        <Skeleton className="rounded-lg">
          <div className="h-24 rounded-lg bg-default-300"></div>
        </Skeleton>
      </div>
      <div className="animate-pulse bg-primary/10 h-[125px] w-[250px] rounded-xl"></div>
      <div className="space-y-2">
        <div className="animate-pulse rounded-md bg-primary/10 h-4 w-[250px]"></div>
        <div className="animate-pulse rounded-md bg-primary/10 h-4 w-[200px]"></div>
      </div>
      <Skeleton className="rounded-lg">
        <div className="h-24 rounded-lg bg-default-300"></div>
      </Skeleton>
      <div className="space-y-3">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">
          <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
        </Skeleton>
      </div>
    </Card>
  );
};
