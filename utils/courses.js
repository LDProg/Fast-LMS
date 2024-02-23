import prisma from "@/lib/prisma";
import { getProgress } from "./user-progress";

export const getCourses = async ({ userId, title, categoryId }) => {
  try {
    const courses = await prisma.course.findMany({
      where: {
        categoryId,
        isPublished: true,
        title: {
          contains: title,
        },
      },
      include: {
        category: true,
        chapters: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
          },
        },
        purchases: {
          where: {
            userId,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const coursesWithProgress = await Promise.all(
      courses.map(async (course) => {
        if (course.purchases.length === 0) {
          return {
            ...course,
            progress: null,
          };
        }
        const progressPercentage = await getProgress(userId, course.id);
        return {
          ...course,
          progress: progressPercentage,
        };
      })
    );

    return coursesWithProgress;
  } catch (err) {
    console.log("[GET_COURSES]", err);
  } finally {
    prisma.$disconnect();
  }
};

export const isPurchasedCourse = async (courseId, userId) => {
  try {
    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
      include: {
        purchases: {
          where: {
            userId,
          },
        },
      },
    });

    return course;
  } catch (err) {
    console.log("[IS_PURCHASED_COURSE]", err);
  } finally {
    prisma.$disconnect();
  }
};
