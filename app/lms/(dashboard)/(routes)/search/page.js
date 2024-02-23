import { CoursesList } from "@/components/lms/courses-list";
import { SearchInput } from "@/components/lms/search-input";
import { currentUserId } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getCourses } from "@/utils/courses";
import { redirect } from "next/navigation";
import { Categories } from "./_components/categories";

export default async function LmsSearchPage({ searchParams }) {
  const userId = await currentUserId();

  if (!userId) return redirect("/auth/signin");

  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const courses = await getCourses({ userId, ...searchParams });

  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6">
        <Categories items={categories} />
        <CoursesList courses={courses} />
      </div>
    </>
  );
}
