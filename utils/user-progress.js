import prisma from "@/lib/prisma";

export const getProgress = async (userId, courseId) => {
  try {
    const publishedChapters = await prisma.chapter.findMany({
      where: {
        courseId,
        isPublished: true,
      },
      select: {
        id: true,
      },
    });

    const publishedChaptersIds = publishedChapters.map((chapter) => chapter.id);

    const validCompleteChapters = await prisma.userProgress.count({
      where: {
        userId,
        chapterId: {
          in: publishedChaptersIds,
        },
        isCompleted: true,
      },
    });

    const progressPercentage =
      (validCompleteChapters / publishedChaptersIds.length) * 100;

    return progressPercentage;
  } catch (err) {
    console.log("GET_PROGRESS", err);
  } finally {
    prisma.$disconnect();
  }
};
