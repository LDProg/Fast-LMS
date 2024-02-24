import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { CoursesList } from "@/components/lms/courses-list";
import { getDashboardCourses } from "@/utils/dashboard-courses";
import { getProgress } from "@/utils/user-progress";
import { InfoCard } from "./_components/info-card";

export default async function Dashboard() {
  const session = await auth();

  if (!session?.user.id) {
    return redirect("/auth");
  }

  // const { completedCourses, coursesInProgress } = await getDashboardCourses(
  //   session?.user.id
  // );

  const { purchasedCourses } = await getDashboardCourses(session?.user.id);

  const courses = purchasedCourses.map((purchase) => purchase.course);

  for (let course of courses) {
    const progress = await getProgress(session?.user.id, course.id);
    course["progress"] = progress;
  }

  const completedCourses = courses.filter((course) => course.progress === 100);
  const coursesInProgress = courses.filter(
    (course) => (course.progress ?? 0) < 100
  );

  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard
          icon="Clock"
          label="En cours"
          numberOfItems={coursesInProgress.length}
        />
        <InfoCard
          icon="CheckCircle"
          label={completedCourses.length > 1 ? "Terminés" : "Terminé"}
          numberOfItems={completedCourses.length}
          variant="success"
        />
      </div>
      <CoursesList courses={[...coursesInProgress, ...completedCourses]} />
    </div>
  );
}
