import { LoadingCharts } from "@/loading/loading-charts";
import { Suspense } from "react";
import { ChartWrapper } from "./_components/chart-wrapper";
import { CurrentMonthChartWrapper } from "./_components/current-month-chart-wrapper";
import { Last12MonthsChartWrapper } from "./_components/last-12-month-chart-wrapper";

export default async function LmsTeacherAnalyticsPage() {
  return (
    <div className="p-6 flex flex-col gap-14">
      <Suspense fallback={<LoadingCharts />}>
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
