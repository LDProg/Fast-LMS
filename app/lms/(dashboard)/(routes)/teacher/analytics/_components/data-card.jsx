import { formatPrice } from "@/lib/format-price";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

export const DataCard = ({ value, label, shouldFormat }) => {
  return (
    <Card className="rounded-md">
      <CardHeader className="flex flex-row items-center justify-between">
        <p className="text-sm font-medium">{label}</p>
      </CardHeader>
      <CardBody>
        <div className="text-2xl font-bold">
          {shouldFormat ? formatPrice(value) : value}
        </div>
      </CardBody>
    </Card>
  );
};
