import prisma from "@/lib/prisma";

export const getDashboardCourses = async (userId) => {
  try {
    const purchasedCourses = await prisma.purchase.findMany({
      where: {
        userId,
      },
      select: {
        course: {
          include: {
            category: true,
            chapters: {
              where: {
                isPublished: true,
              },
            },
          },
        },
      },
    });

    // console.log("[GET_DASHBOARD_COURSES]", purchasedCourses);

    // const courses = purchasedCourses.map((purchase) => purchase.course);

    // for (let course of courses) {
    //   const progress = await getProgress(userId, course.id);
    //   course["progress"] = progress;
    // }

    // const completedCourses = courses.filter(
    //   (course) => course.progress === 100
    // );
    // const coursesInProgress = courses.filter(
    //   (course) => (course.progress ?? 0) < 100
    // );

    // console.log("[GET_DASHBOARD_COURSES]", {
    //   completedCourses,
    //   coursesInProgress,
    // });

    return {
      purchasedCourses,
    };
  } catch (error) {
    console.log("[GET_DASHBOARD_COURSES]", error);
    return {
      completedCourses: [],
      coursesInProgress: [],
    };
  }
};
