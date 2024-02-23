import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { CoursesList } from "@/components/lms/courses-list";
import { getDashboardCourses } from "@/utils/dashboard-courses";
import { InfoCard } from "./_components/info-card";

export default async function Dashboard() {
  const session = await auth();

  if (!session?.user.id) {
    return redirect("/auth/signin");
  }

  const { completedCourses, coursesInProgress } = await getDashboardCourses(
    session?.user.id
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
