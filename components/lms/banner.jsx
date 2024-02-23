import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { AlertTriangle, CheckCircleIcon } from "lucide-react";

const bannerVariants = cva("text-center p-4 text-sm flex items-center w-full", {
  variants: {
    variant: {
      warning:
        "bg-warning-200 dark:bg-warning-200/60 text-warning-600 dark:text-warning-600",
      success: "bg-success-300 text-success-700 dark:bg-success-400/50",
    },
  },
  defaultVariants: {
    variant: "warning",
  },
});

const iconMap = {
  warning: AlertTriangle,
  success: CheckCircleIcon,
};

export const Banner = ({ label, variant }) => {
  const Icon = iconMap[variant || "warning"];
  return (
    <div className={cn(bannerVariants({ variant }))}>
      <Icon className="h-4 w-4 mr-2" />
      {label}
    </div>
  );
};
