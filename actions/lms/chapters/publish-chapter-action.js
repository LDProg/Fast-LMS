"use server";

import { currentUser, currentUserId } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { PublishChapterSchema } from "@/schemas";

export const publishChapterAction = async (formData) => {
  try {
    const isValid = await PublishChapterSchema.isValid(formData);
    if (!isValid) {
      return { error: "Champs invalides" };
    }

    const user = await currentUser();
    const userId = await currentUserId();

    if (!userId)
      return { error: { unauthorized: "Vous n'êtes pas autorisé." } };
    if (user.role !== "ADMIN")
      return { error: { unauthorized: "Vous n'êtes pas autorisé." } };

    const { isPublished, courseId, chapterId } = formData;

    const chapter = await prisma.chapter.findUnique({
      where: { id: chapterId },
    });

    if (isPublished) {
      const unPublishedChapter = await prisma.chapter.update({
        where: { id: chapterId, courseId },
        data: {
          isPublished: false,
          publishedAt: null,
        },
      });

      console.log(`Chapter has been unpublished. 🌱`);
      return { success: unPublishedChapter };
    } else {
      const muxData = await prisma.muxData.findUnique({
        where: { chapterId },
      });

      if (
        !chapter ||
        // !muxData ||
        !chapter.title ||
        !chapter.description
        // || !chapter.videoUrl
      )
        return { error: "Champs manquants" };

      const publishedChapter = await prisma.chapter.update({
        where: { id: chapterId, courseId },
        data: {
          isPublished: true,
          publishedAt: new Date(),
        },
      });

      console.log(`Chapter has been published. 🌱`);
      return { success: publishedChapter };
    }
  } catch (error) {
    console.log("[CHAPTER_ID_PUBLISH]", error);
    return { error: "Erreur interne veuillez rééassayer." };
  } finally {
    await prisma.$disconnect();
  }
};
