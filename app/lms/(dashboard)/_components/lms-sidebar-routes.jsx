"use client";

import { BarChart, Compass, Layout, List } from "lucide-react";
import { usePathname } from "next/navigation";
import { LmsSidebarItem } from "./lms-sidebar-item";

const guestRoutes = [
  {
    icon: <Layout />,
    label: "Tableau de bord",
    href: "/lms",
  },
  {
    icon: <Compass />,
    label: "Chercher",
    href: "/lms/search",
  },
];

export const teacherRoutes = [
  {
    icon: <List />,
    label: "Cours",
    href: "/lms/teacher/courses",
  },
  {
    icon: <BarChart />,
    label: "Analytiques",
    href: "/lms/teacher/analytics",
  },
];

export const LmsSidebarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.includes("/lms/teacher");

  const routes = isTeacherPage ? teacherRoutes : guestRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => {
        return (
          <LmsSidebarItem
            key={route.href}
            icon={route.icon}
            label={route.label}
            href={route.href}
          />
        );
      })}
    </div>
  );
};
