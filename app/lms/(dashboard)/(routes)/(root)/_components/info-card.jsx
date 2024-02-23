import IconBadge from "@/components/ui/icon-badge";
import { Card, CardBody } from "@nextui-org/react";

export const InfoCard = ({ variant, icon, numberOfItems, label }) => {
  return (
    <Card className="rounded-md dark:bg-accent">
      <CardBody className="flex flex-row items-center gap-x-2 p-4">
        <div>
          <IconBadge size="sm" variant={variant} icon={icon} />
        </div>
        <div>
          <p className="font-medium">{label}</p>
          <p className="text-muted-foreground/80 text-sm">
            {numberOfItems} Cours
          </p>
        </div>
      </CardBody>
    </Card>
  );
};
