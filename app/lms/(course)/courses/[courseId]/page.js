import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function LmsCourseIdPage({ params }) {
  const course = await prisma.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!course) return redirect("/lms");

  return redirect(
    `/lms/courses/${course?.id}/chapters/${course?.chapters[0]?.id}`
  );
}
