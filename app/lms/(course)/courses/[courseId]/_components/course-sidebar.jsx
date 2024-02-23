import { CourseProgress } from "@/components/lms/course-progress";
import { currentUserId } from "@/lib/auth";
import { redirect } from "next/navigation";
import { CourseSidebarItem } from "./course-sidebar-item";
import prisma from "@/lib/prisma";

export const CourseSidebar = async ({ course, progressCount }) => {
  const userId = await currentUserId();

  if (!userId) return redirect("/auth/signin");

  const purchase = await prisma.purchase.findUnique({
    where: {
      userId_courseId: {
        courseId: course.id,
        userId,
      },
    },
  });

  return (
    <div className="h-full border-r border-r-muted-foreground/50 flex flex-col overflow-y-auto bg-background shadow-sm">
      <div className="p-8 flex flex-col border-b border-b-muted-foreground/50">
        <h1 className="font-semibold">{course.title}</h1>
        {purchase && (
          <div className="mt-10">
            <CourseProgress value={progressCount} />
          </div>
        )}
      </div>
      <div className="flex flex-col w-full">
        {course.chapters.map((chapter) => (
          <CourseSidebarItem
            key={chapter.id}
            id={chapter.id}
            label={chapter.title}
            isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
            courseId={course.id}
            isLocked={!chapter.isFree && !purchase}
          />
        ))}
      </div>
    </div>
  );
};
