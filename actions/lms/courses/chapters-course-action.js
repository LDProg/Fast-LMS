"use server";

import { currentUser, currentUserId } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { ChaptersCourseSchema } from "@/schemas";

export const chaptersCourseAction = async (formData) => {
  try {
    const isValid = await ChaptersCourseSchema.isValid(formData);
    if (!isValid) {
      return { error: "Champs invalides" };
    }

    const user = await currentUser();
    const userId = await currentUserId();

    if (!userId)
      return { error: { unauthorized: "Vous n'êtes pas autorisé." } };
    if (user.role !== "ADMIN")
      return { error: { unauthorized: "Vous n'êtes pas autorisé." } };

    const { courseId, title } = formData;

    const lastChapter = await prisma.chapter.findFirst({
      where: {
        courseId,
      },
      orderBy: {
        position: "desc",
      },
    });

    const newPosition = lastChapter ? lastChapter.position + 1 : 1;

    const chapter = await prisma.chapter.create({
      data: {
        title,
        courseId,
        position: newPosition,
      },
    });

    console.log(`Course's description has been updated. 🌱`);
    return { success: chapter };
  } catch (error) {
    console.log("[CHAPTERS_ID_CREATE]", error);
    return { error: "Erreur interne veuillez rééassayer." };
  } finally {
    await prisma.$disconnect();
  }
};
