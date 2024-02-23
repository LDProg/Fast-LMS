"use client";

import { cn } from "@/lib/utils";
import { Button } from "@nextui-org/react";
import { CheckCircle, Lock, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export const CourseSidebarItem = ({
  key,
  id,
  label,
  isCompleted,
  courseId,
  isLocked,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const Icon = isLocked ? (
    <Lock />
  ) : isCompleted ? (
    <CheckCircle />
  ) : (
    <PlayCircle />
  );
  const isActive = pathname?.includes(id);

  const onClick = () => router.push(`/lms/courses/${courseId}/chapters/${id}`);

  return (
    <Button
      type="button"
      onClick={onClick}
      startContent={Icon}
      variant="light"
      className={cn(
        "flex p-6 items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20 rounded-sm",
        isActive &&
          "text-sky-700 bg-sky-200/20 hover-bg-sky-200/20 hover:text-sky-700",
        isCompleted && "text-success-300 hover:text-success",
        isCompleted && isActive && "bg-emerald-200/20"
      )}
    >
      {label}
      <div
        className={cn(
          "ml-auto opacity-0 border-2 border-sky-700 h-full rounded-lg transition-all",
          isActive && "opacity-100"
        )}
      />
    </Button>
  );
};
