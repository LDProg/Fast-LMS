"use client";

import {
  Button,
  Input,
  Listbox,
  ListboxItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { ChevronsUpDown, Search } from "lucide-react";
import { useMemo, useState } from "react";

export const Combo = ({
  categories,
  initialValue,
  isPending,
  selectedKeys,
  setSelectedKeys,
}) => {
  const [filterValue, setFilterValue] = useState("");
  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = useMemo(() => {
    if (categories) {
      let filteredComp = [...categories];

      if (hasSearchFilter) {
        filteredComp = filteredComp.filter((category) =>
          category.label.toLowerCase().includes(filterValue.toLowerCase())
        );
      }

      return filteredComp;
    }
    return null;
  }, [categories, filterValue, hasSearchFilter]);

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", "),
    [selectedKeys]
  );

  const listBoxTopContent = useMemo(() => {
    return (
      <Input
        isClearable
        classNames={{
          base: "w-full",
          inputWrapper: "border-1 h-unit-8",
        }}
        placeholder="Chercher une catégorie"
        size="sm"
        startContent={<Search className="text-default-300" />}
        variant="bordered"
        onClear={() => setFilterValue("")}
        value={filterValue}
        onValueChange={setFilterValue}
      />
    );
  }, [filterValue]);

  const selectedOption = categories.find(
    (option) => option.value === initialValue.categoryId
  );

  const selectedOptionKeys = categories.find(
    (option) => option.value === selectedValue
  );

  return (
    <Popover showArrow placement="bottom">
      <PopoverTrigger>
        <Button
          size="md"
          radius="sm"
          isDisabled={isPending}
          variant="ghost"
          className="w-full rounded-sm flex items-center justify-between"
          endContent={<ChevronsUpDown className="h-4 w-4" />}
        >
          {(() => {
            if (selectedOptionKeys) return selectedOptionKeys.label;
            else if (selectedOption ?? selectedOption?.label)
              return selectedOption.label;
            else return "Sélectionnez une catégorie";
          })()}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full max-w-[340px] h-full border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100 flex justify-center ">
        <Listbox
          emptyContent={"Aucune entreprise pour le moment"}
          topContent={listBoxTopContent}
          classNames={{
            base: "max-w-xs",
            list: "max-h-[300px] overflow-scroll",
          }}
          items={filteredItems}
          label="Assigned to"
          selectionMode="single"
          onSelectionChange={setSelectedKeys}
          variant="flat"
        >
          {(item) => (
            <ListboxItem key={item.value} textValue={item.label}>
              <div className="flex flex-col">
                <span className="text-small">{item.label}</span>
              </div>
            </ListboxItem>
          )}
        </Listbox>
      </PopoverContent>
    </Popover>
  );
};
