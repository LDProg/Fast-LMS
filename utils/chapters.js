import prisma from "@/lib/prisma";

export const getChapter = async ({ userId, courseId, chapterId }) => {
  try {
    const purchase = await prisma.purchase.findUnique({
      where: {
        userId_courseId: { userId, courseId },
      },
    });

    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
        isPublished: true,
      },
      select: {
        price: true,
      },
    });

    const chapter = await prisma.chapter.findUnique({
      where: {
        id: chapterId,
        isPublished: true,
      },
    });

    if (!chapter || !course)
      return { error: "Le cours ou le chapitre est introuvable." };

    // let muxData = null;
    let attachments = [];
    let nextChapter = null;

    if (purchase) {
      attachments = await prisma.attachment.findMany({
        where: {
          courseId,
        },
      });
    }

    if (chapter.isFree || purchase) {
      // muxData = await prisma.muxData.findUnique({
      //   where: {
      //     chapterId,
      //   },
      // });

      nextChapter = await prisma.chapter.findFirst({
        where: {
          courseId,
          isPublished: true,
          position: {
            gt: chapter?.position,
          },
        },
        orderBy: {
          position: "asc",
        },
      });
    }

    const userProgress = await prisma.userProgress.findUnique({
      where: {
        userId_chapterId: { userId, chapterId },
      },
    });

    return {
      chapter,
      course,
      // muxData,
      attachments,
      nextChapter,
      userProgress,
      purchase,
    };
  } catch (err) {
    console.log("[GET_CHAPTERS]", err);
    return {
      chapter: null,
      course: null,
      // muxData: null,
      attachments: [],
      nextChapter: null,
      userProgress: null,
      purchase: null,
    };
  }
};
