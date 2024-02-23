"use client";

import { Pagination } from "@nextui-org/react";

export const BottomCoursesTable = ({ page, setPage, allPages }) => {
  return (
    <div className="flex w-full justify-center" role="navigation">
      <Pagination
        aria-label="Pagination"
        loop
        showControls
        showShadow
        role="button"
        page={page}
        total={allPages}
        onChange={(page) => setPage(page)}
        variant="light"
        classNames={{
          cursor: "bg-primary text-white font-medium",
        }}
      />
    </div>
  );
};
