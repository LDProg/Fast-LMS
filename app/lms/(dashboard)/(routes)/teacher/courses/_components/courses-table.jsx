"use client";

import { cn } from "@/lib/utils";
import {
  Chip,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/react";
import { useCallback, useMemo, useState } from "react";

import { formatPrice } from "@/lib/format-price";
import { ActionsCoursesTable } from "./actions-courses-table";
import { BottomCoursesTable } from "./bottom-courses-table";
import { coursesColumns, statusOptions } from "./utils-interns-table";
import { TopCoursesTable } from "./top-courses-table";

export const CoursesTable = ({ courses }) => {
  const [filterValue, setFilterValue] = useState("");
  const hasSearchFilter = Boolean(filterValue);
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "title",
    direction: "ascending",
  });

  const rowsPerPage = 5;

  const filteredItems = useMemo(() => {
    if (courses) {
      let filteredCourses = [...courses];

      if (hasSearchFilter) {
        filteredCourses = filteredCourses.filter((el) =>
          el.title.toLowerCase().includes(filterValue.toLowerCase())
        );
      }

      if (
        statusFilter !== "all" &&
        Array.from(statusFilter).length !== statusOptions.length
      ) {
        const status = Array.from(statusFilter)[0];
        setPage(1);

        if (status === "true") {
          filteredCourses = filteredCourses.filter(
            (course) => course.isPublished === true
          );
        } else if (status === "false") {
          filteredCourses = filteredCourses.filter(
            (course) => course.isPublished === false
          );
        }
      }

      return filteredCourses;
    }
    return null;
  }, [courses, filterValue, statusFilter, hasSearchFilter]);

  const items = useMemo(() => {
    if (courses) {
      const start = (page - 1) * rowsPerPage;
      const end = start + rowsPerPage;

      return filteredItems.slice(start, end);
    }
    return null;
  }, [courses, page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    if (courses) {
      return [...items].sort((a, b) => {
        const first = a[sortDescriptor.column];
        const second = b[sortDescriptor.column];
        let cmp;
        if (first < second) cmp = -1;
        else if (first > second) cmp = 1;
        else cmp = 0;

        return sortDescriptor.direction === "descending" ? -cmp : cmp;
      });
    }
    return null;
  }, [courses, sortDescriptor, items]);

  const onSearchChange = useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const allPages = useMemo(() => {
    return Math.ceil(filteredItems.length / rowsPerPage);
  }, [filteredItems]);

  return (
    <Table
      aria-label="Tableaux des cours"
      classNames={{
        base: "h-full",
        wrapper: "h-fit w-full",
        th: ["border-b", "border-divider"],
        td: [],
      }}
      topContent={
        <TopCoursesTable
          filterValue={filterValue}
          setFilterValue={setFilterValue}
          onSearchChange={onSearchChange}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          courses={courses}
          selectedKeys={selectedKeys}
          items={items}
        />
      }
      bottomContent={
        allPages > 0 ? (
          <BottomCoursesTable
            page={page}
            setPage={setPage}
            allPages={allPages}
          />
        ) : null
      }
      // topContentPlacement="outside"
      // bottomContentPlacement="outside"
      sortDescriptor={sortDescriptor}
      onSortChange={setSortDescriptor}
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      onSelectionChange={setSelectedKeys}
    >
      <TableHeader columns={coursesColumns}>
        {(column) => (
          <TableColumn
            key={column.accessorKey}
            align={column.accessorKey === "actions" ? "end" : "start"}
            allowsSorting={column.sortable}
            className={column.accessorKey === "actions" ? "text-right" : null}
          >
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        aria-label="Tous les cours"
        items={sortedItems ?? []}
        emptyContent="Aucun cours pour l'instant"
        loadingContent={<Spinner />}
      >
        {(item) => (
          <TableRow key={item?.id} aria-label={item.title}>
            {(columnKey) => (
              <TableCell>
                {columnKey === "isPublished" && (
                  <Chip
                    variant="shadow"
                    className={cn(
                      "bg-muted-foreground text-xs text-white",
                      item[columnKey] && "bg-success"
                    )}
                  >
                    {item[columnKey] ? "Publié" : "Privé"}
                  </Chip>
                )}

                {columnKey === "price"
                  ? formatPrice(getKeyValue(item, columnKey))
                  : getKeyValue(item, columnKey)}
                {columnKey === "actions" && (
                  <ActionsCoursesTable courseId={item.id} />
                )}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
