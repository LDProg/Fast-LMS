"use server";

import { currentUser, currentUserId } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { TitleChapterSchema } from "@/schemas";

export const titleChapterAction = async (formData) => {
  try {
    const isValid = await TitleChapterSchema.isValid(formData);
    if (!isValid) {
      return { error: "Champs invalides" };
    }

    const user = await currentUser();
    const userId = await currentUserId();

    if (!userId)
      return { error: { unauthorized: "Vous n'êtes pas autorisé." } };
    if (user.role !== "ADMIN")
      return { error: { unauthorized: "Vous n'êtes pas autorisé." } };

    const { title, courseId, chapterId } = formData;

    const chapter = await prisma.chapter.update({
      where: { id: chapterId, courseId },
      data: {
        title,
      },
    });

    console.log(`Chapter's title has been updated. 🌱`);
    return { success: chapter };
  } catch (error) {
    console.log("[CHAPTER_ID_TITLE]", error);
    return { error: "Erreur interne veuillez rééassayer." };
  } finally {
    await prisma.$disconnect();
  }
};
