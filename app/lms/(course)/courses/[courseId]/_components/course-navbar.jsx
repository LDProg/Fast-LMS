import { NavbarRoutes } from "@/components/lms/navbar-routes";
import { CourseMobileSidebar } from "./course-mobile-sidebar";

export const CourseNavbar = ({ course, progressCount }) => {
  return (
    <div className="p-4 border-b border-b-muted-foreground/50 h-full flex items-center bg-background shadow-sm">
      <CourseMobileSidebar course={course} progressCount={progressCount} />
      <NavbarRoutes />
    </div>
  );
};
