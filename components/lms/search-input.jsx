"use client";

import { useDebounce } from "@/hooks/debounce-hooks";
import { Input } from "@nextui-org/react";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useEffect, useState } from "react";

export const SearchInput = () => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 500);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentCategoryId = searchParams.get("categoryId");

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          title:
            debouncedValue.charAt(0).toUpperCase() +
            debouncedValue.slice(1).toLowerCase(),
          categoryId: currentCategoryId,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  }, [debouncedValue, currentCategoryId, pathname, router]);

  return (
    <div className="relative">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        startContent={<Search className="h-4 w-4 text-muted-foreground" />}
        radius="sm"
        className="w-full md:w-[300px] focus-visible:ring-slate-200"
        classNames={{
          inputWrapper: "h-unit-12",
        }}
        placeholder="Chercher un cours"
      />
    </div>
  );
};
