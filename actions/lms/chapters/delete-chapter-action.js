"use server";

import { currentUser, currentUserId } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { DeleteChapterSchema } from "@/schemas";

export const deleteChapterAction = async (formData) => {
  try {
    const isValid = await DeleteChapterSchema.isValid(formData);
    if (!isValid) {
      return { error: "Champs invalides" };
    }

    const user = await currentUser();
    const userId = await currentUserId();

    if (!userId)
      return { error: { unauthorized: "Vous n'êtes pas autorisé." } };
    if (user.role !== "ADMIN")
      return { error: { unauthorized: "Vous n'êtes pas autorisé." } };

    const { courseId, chapterId } = formData;

    const chapter = await prisma.chapter.findUnique({
      where: { id: chapterId, courseId },
    });

    if (!chapter) {
      return { error: "Le chapitre n'existe pas." };
    }

    if (chapter.videoUrl) {
      const existingMuxData = await prisma.muxData.findFirst({
        where: {
          chapterId,
        },
      });

      if (existingMuxData) {
        await Video.Assets.del(existingMuxData.assetId);
        await prisma.muxData.delete({
          where: {
            id: existingMuxData.id,
          },
        });
      }
    }

    const deletedChapter = await prisma.chapter.delete({
      where: { id: chapterId, courseId },
    });

    const publishedChaptersInCourse = await prisma.chapter.findMany({
      where: { courseId, isPublished: true },
    });

    if (!publishedChaptersInCourse.length) {
      await prisma.course.update({
        where: { id: courseId },
        data: {
          isPublished: false,
        },
      });
    }

    console.log(`Chapter has been deleted. 🚮`);
    return { success: deletedChapter };
  } catch (error) {
    console.log("[CHAPTER_ID_DELETE]", error);
    return { error: "Erreur interne veuillez rééassayer." };
  } finally {
    await prisma.$disconnect();
  }
};
