import { LoadingCharts } from "@/loading/loading-charts";
import { Card, Skeleton } from "@nextui-org/react";
import { Suspense } from "react";
import { ChartWrapper } from "./_components/chart-wrapper";
import { CurrentMonthChartWrapper } from "./_components/current-month-chart-wrapper";
import { Last12MonthsChartWrapper } from "./_components/last-12-month-chart-wrapper";

export default async function LmsTeacherAnalyticsPage() {
  return (
    <div className="p-6 flex flex-col gap-14">
      <Suspense
        fallback={
          <div>
            <div className="h-[100px] mb-4">
              <Skeleton
                disableAnimation
                className="h-full w-full rounded-lg animate-pulse bg-primary/10"
              />
            </div>
            <Card className="w-full p-4 h-[550px]" radius="lg">
              <div className="flex justify-around items-end gap-4 w-full h-full">
                <Skeleton
                  disableAnimation
                  className="h-[300px] w-2/5 rounded-lg animate-pulse bg-primary/10"
                />
                <Skeleton
                  disableAnimation
                  className="h-[100px] w-2/5 rounded-lg animate-pulse bg-primary/10"
                />
                <Skeleton
                  disableAnimation
                  className="h-[150px] w-2/5 rounded-lg animate-pulse bg-primary/10"
                />
                <Skeleton
                  disableAnimation
                  className="h-[220px] w-2/5 rounded-lg animate-pulse bg-primary/10"
                />
                <Skeleton
                  disableAnimation
                  className="h-[200px] w-2/5 rounded-lg animate-pulse bg-primary/10"
                />
                <Skeleton
                  disableAnimation
                  className="h-[130px] w-2/5 rounded-lg animate-pulse bg-primary/10"
                />
                <Skeleton
                  disableAnimation
                  className="h-[269px] w-2/5 rounded-lg animate-pulse bg-primary/10"
                />
                <Skeleton
                  disableAnimation
                  className="h-[330px] w-2/5 rounded-lg animate-pulse bg-primary/10"
                />
                <Skeleton
                  disableAnimation
                  className="h-[240px] w-2/5 rounded-lg animate-pulse bg-primary/10"
                />
                <Skeleton
                  disableAnimation
                  className="h-[200px] w-2/5 rounded-lg animate-pulse bg-primary/10"
                />
                <Skeleton
                  disableAnimation
                  className="h-[300px] w-2/5 rounded-lg animate-pulse bg-primary/10"
                />
                <Skeleton
                  disableAnimation
                  className="h-[320px] w-2/5 rounded-lg animate-pulse bg-primary/10"
                />
              </div>
            </Card>
          </div>
        }
      >
        <ChartWrapper />
      </Suspense>
      <Suspense fallback={<LoadingCharts />}>
        <CurrentMonthChartWrapper />
      </Suspense>
      <Suspense fallback={<LoadingCharts />}>
        <Last12MonthsChartWrapper />
      </Suspense>
    </div>
  );
}
