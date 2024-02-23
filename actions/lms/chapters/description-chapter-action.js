"use server";

import { currentUser, currentUserId } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { DescriptionChapterSchema } from "@/schemas";

export const descriptonChapterAction = async (formData) => {
  try {
    const isValid = await DescriptionChapterSchema.isValid(formData);
    if (!isValid) {
      return { error: "Champs invalides" };
    }

    const user = await currentUser();
    const userId = await currentUserId();

    if (!userId)
      return { error: { unauthorized: "Vous n'êtes pas autorisé." } };
    if (user.role !== "ADMIN")
      return { error: { unauthorized: "Vous n'êtes pas autorisé." } };

    const { description, courseId, chapterId } = formData;

    const chapter = await prisma.chapter.update({
      where: { id: chapterId, courseId },
      data: {
        description,
      },
    });

    console.log(`Chapter's description has been updated. 🌱`);
    return { success: chapter };
  } catch (error) {
    console.log("[CHAPTER_ID_DESCRIPTION]", error);
    return { error: "Erreur interne veuillez rééassayer." };
  } finally {
    await prisma.$disconnect();
  }
};
