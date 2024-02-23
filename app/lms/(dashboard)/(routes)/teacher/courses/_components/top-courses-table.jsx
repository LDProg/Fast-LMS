import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Link,
} from "@nextui-org/react";
import { ChevronDown, Plus, Search } from "lucide-react";
import { statusOptions } from "./utils-interns-table";

export const TopCoursesTable = ({
  filterValue,
  setFilterValue,
  onSearchChange,
  statusFilter,
  setStatusFilter,
  courses,
  selectedKeys,
  items,
}) => {
  let selectionInfo;

  if (selectedKeys == "all") {
    selectionInfo = "Tous les cours sélectionnés";
  } else if (selectedKeys == 1) {
    selectionInfo = `${selectedKeys.size} sur ${items?.length} selectionné`;
  } else {
    selectionInfo = `${selectedKeys.size} sur ${items?.length} selectionnés`;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-3 items-end">
        <Input
          aria-label="Chercher un titre de cours"
          isClearable
          classNames={{
            base: "w-full sm:max-w-[44%]",
            inputWrapper: "h-unit-10",
          }}
          placeholder="Chercher un titre"
          size="sm"
          startContent={<Search className="h-4 w-4 text-muted-foreground/90" />}
          value={filterValue}
          variant="faded"
          onClear={() => setFilterValue("")}
          onValueChange={onSearchChange}
        />
        <div className="flex gap-3">
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button
                aria-label="Boutton filtrer les cours par statut"
                endContent={<ChevronDown className="w-4 h-4" />}
                size="sm"
                variant="flat"
                className="h-unit-10"
              >
                Status
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Filtre les cours par statut"
              closeOnSelect={false}
              selectedKeys={statusFilter}
              selectionMode="multiple"
              onSelectionChange={setStatusFilter}
            >
              {statusOptions.map((status) => (
                <DropdownItem
                  aria-label={status}
                  key={status.key}
                  className="capitalize"
                >
                  <Chip
                    variant="dot"
                    className="border-none"
                    color={status.color}
                  >
                    {status.name.charAt(0).toUpperCase() + status.name.slice(1)}
                  </Chip>
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Button
            aria-label="Boutton ajouter un cours"
            as={Link}
            className="bg-primary text-white font-medium h-unit-10"
            endContent={<Plus className="w-4 h-4" />}
            size="sm"
            radius="sm"
            href="/lms/teacher/create"
          >
            Ajouter
          </Button>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-default-400 text-small">
          Total : {courses?.length} cours
        </span>
        <span className="text-small text-default-400">{selectionInfo}</span>
      </div>
    </div>
  );
};
