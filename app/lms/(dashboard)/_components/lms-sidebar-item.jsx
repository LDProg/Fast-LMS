"use client";

import { cn } from "@/lib/utils";
import { Button } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";

export const LmsSidebarItem = ({ icon, label, href }) => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive =
    (pathname === "/lms" && href === "/lms") ||
    (href !== "/lms" && pathname?.startsWith(`${href}`));

  return (
    <Button
      aria-label={label}
      type="button"
      onClick={() => router.push(href)}
      startContent={icon}
      variant="light"
      className={cn(
        "flex p-1 items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20 rounded-sm",
        isActive &&
          "text-sky-700 bg-sky-200/20 hover-bg-sky-200/20 hover:text-sky-700"
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
