import { Progress } from "@nextui-org/react";

export const CourseProgress = ({ value }) => {
  return (
    <div>
      <Progress
        size="sm"
        radius="sm"
        classNames={{
          base: "max-w-md",
          track: "drop-shadow-md border border-default",
          indicator: value === 100 ? "bg-success" : "bg-warning ",
          label: "tracking-wider font-medium text-default-600",
          value: "text-foreground/60",
        }}
        label="Progression"
        value={value}
        showValueLabel={true}
      />
    </div>
  );
};
