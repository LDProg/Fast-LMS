import { LmsSidebarRoutes } from "./lms-sidebar-routes";

export const LmsSidebar = () => {
  return (
    <div className="h-full border-r border-r-muted-foreground/50 flex flex-col overflow-y-auto bg-background shadow-sm">
      <div className="h-[80px] flex items-center pl-6">Logo</div>
      <div className="flex flex-col w-full">
        <LmsSidebarRoutes />
      </div>
    </div>
  );
};
