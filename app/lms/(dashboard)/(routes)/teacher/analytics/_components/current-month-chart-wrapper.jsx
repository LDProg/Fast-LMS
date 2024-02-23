import { auth } from "@/auth";
import { getAnalyticsForCurrentMonth } from "@/utils/analytics";
import { redirect } from "next/navigation";
import { Chart } from "./chart";
import { DataCard } from "./data-card";

export const CurrentMonthChartWrapper = async () => {
  const session = await auth();

  if (!session?.user?.id) return redirect("/auth/signin");

  const { dataCurrentMonth, totalRevenue, totalSales } =
    await getAnalyticsForCurrentMonth(session.user.id);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <DataCard
          label="Revenu Total Du Mois"
          value={totalRevenue}
          shouldFormat
        />
        <DataCard label="Ventes Totales Du Mois" value={totalSales} />
      </div>
      <Chart data={dataCurrentMonth} dataLabel="Ce mois" />
    </div>
  );
};
