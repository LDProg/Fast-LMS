"use client";

import { cn } from "@/lib/utils";
import { Button } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

export const CategoryItem = ({ label, value, icon }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentCategoryId = searchParams.get("categoryId");
  const currentTitle = searchParams.get("title");

  const isSelected = currentCategoryId === value;

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          categoryId: isSelected ? null : value,
          title: currentTitle,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  };
  return (
    <Button
      onClick={onClick}
      variant="ghost"
      radius="full"
      className={cn(
        "border",
        isSelected && "border-none bg-primary-400 text-white"
      )}
      startContent={icon}
    >
      {label}
    </Button>
  );
};
