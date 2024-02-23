"use server";

import { currentUser, currentUserId } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { AccessChapterSchema } from "@/schemas";

export const accessChapterAction = async (formData) => {
  try {
    const isValid = await AccessChapterSchema.isValid(formData);
    if (!isValid) {
      return { error: "Champs invalides" };
    }

    const user = await currentUser();
    const userId = await currentUserId();

    if (!userId)
      return { error: { unauthorized: "Vous n'êtes pas autorisé." } };
    if (user.role !== "ADMIN")
      return { error: { unauthorized: "Vous n'êtes pas autorisé." } };

    const { isFree, courseId, chapterId } = formData;

    const chapter = await prisma.chapter.update({
      where: { id: chapterId, courseId },
      data: {
        isFree,
      },
    });

    console.log(`Chapter's access has been updated. 🌱`);
    return { success: chapter };
  } catch (error) {
    console.log("[CHAPTER_ID_ACCESS]", error);
    return { error: "Erreur interne veuillez rééassayer." };
  } finally {
    await prisma.$disconnect();
  }
};
