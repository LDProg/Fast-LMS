import { auth } from "@/auth";
import { getAnalytics } from "@/utils/analytics";
import { redirect } from "next/navigation";
import { Chart } from "./chart";
import { DataCard } from "./data-card";

export const ChartWrapper = async () => {
  const session = await auth();

  if (!session?.user?.id) return redirect("/auth/signin");

  const { data, totalRevenue, totalSales } = await getAnalytics(
    session.user.id
  );

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <DataCard label="Revenu Total" value={totalRevenue} shouldFormat />
        <DataCard label="Ventes Totales" value={totalSales} />
      </div>
      <Chart data={data} dataLabel="Tous vos cours" />
    </div>
  );
};
