"use client";

import { formatPrice } from "@/lib/format-price";
import { Card, CardHeader } from "@nextui-org/react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-accent/80 p-4 shadow-sm rounded-md">
        <p className="font-medium text-md">{`${label} : ${formatPrice(
          payload[0].value
        )}`}</p>
      </div>
    );
  }

  return null;
};

export const Chart = ({ data, dataLabel }) => {
  const error = console.error;
  console.error = (...args) => {
    if (/defaultProps/.test(args[0])) return;
    error(...args);
  };
  return (
    <>
      {!data && <div>Ca charge !</div>}

      <Card className="pr-6 pt-6">
        <CardHeader>
          <h2 className="font-medium text-xl pb-6 pl-3">{dataLabel}</h2>
        </CardHeader>
        <ResponsiveContainer width="100%" height={450}>
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value} €`}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "transparent" }}
            />
            <Bar
              dataKey="total"
              radius={[4, 4, 0, 0]}
              fill="currentColor"
              className="fill-primary"
            />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </>
  );
};
