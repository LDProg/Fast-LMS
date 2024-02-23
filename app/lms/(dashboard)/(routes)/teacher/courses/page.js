import prisma from "@/lib/prisma";
import { CoursesTable } from "./_components/courses-table";

export default async function LmsTeacherCoursesPage({ params }) {
  const courses = await prisma.course.findMany({
    where: {
      authorId: params.userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-6 flex justify-around h-full">
      <CoursesTable courses={courses} />
    </div>
  );
}
