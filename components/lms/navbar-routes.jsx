"use client";

import { Link } from "@nextui-org/react";
import { GraduationCap, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import { Profile } from "../header/profile";
import { ThemeSwitcher } from "../theme/theme-switcher";
import { SearchInput } from "./search-input";

export const NavbarRoutes = () => {
  const pathname = usePathname();
  const isTeacherPage = pathname?.startsWith("/lms/teacher");
  const isCoursePage = pathname?.startsWith("/lms/courses");
  const isSearchPage = pathname?.startsWith("/lms/search");

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}

      <div className="flex items-center gap-x-2 ml-auto">
        {isTeacherPage || isCoursePage ? (
          <Link
            aria-label="Sortir de l'espace formateur"
            color="foreground"
            href="/lms"
            showAnchorIcon
            anchorIcon={<LogOut className="h-4 w-4 mx-2" />}
          >
            Sortir
          </Link>
        ) : (
          <Link
            aria-label="Espace Formateur"
            color="foreground"
            href="/lms/teacher/courses"
            showAnchorIcon
            anchorIcon={<GraduationCap className="h-5 w-5 mx-2" />}
          >
            Espace Formateur
          </Link>
        )}
        <ThemeSwitcher />
        <Suspense fallback={<div>Loading profile.......</div>}>
          <Profile />
        </Suspense>
      </div>
    </>
  );
};
