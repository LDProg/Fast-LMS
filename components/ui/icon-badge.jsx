import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { icons } from "lucide-react";

const backGroundVariants = cva(
  "rounded-full flex items-center justify-center",
  {
    variants: {
      variant: {
        default: "bg-sky-100",
        success: "bg-emerald-100",
      },
      size: {
        default: "p-2",
        sm: "p-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const iconVariant = cva("", {
  variants: {
    variant: {
      default: "text-sky-700",
      success: "text-emerald-700",
    },
    size: {
      default: "h-8 w-8",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export default function IconBadge({ icon, variant, size }) {
  const LucideIcon = icons[icon];

  return (
    <div className={cn(backGroundVariants({ variant, size }))}>
      <LucideIcon className={cn(iconVariant({ variant, size }))} />
    </div>
  );
}
