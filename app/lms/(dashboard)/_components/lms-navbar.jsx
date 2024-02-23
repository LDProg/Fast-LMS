import { NavbarRoutes } from "@/components/lms/navbar-routes";
import { LmsMobileSidebar } from "./lms-mobile-sidebar";

export const LmsNavbar = () => {
  return (
    <div className="p-4 border-b border-b-muted-foreground/50 h-full flex items-center bg-background shadow-sm">
      <LmsMobileSidebar />
      <NavbarRoutes />
    </div>
  );
};
