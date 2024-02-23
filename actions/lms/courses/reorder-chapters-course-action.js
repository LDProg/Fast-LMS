"use server";

import { currentUser, currentUserId } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const reorderChaptersCourseAction = async (formData) => {
  try {
    const user = await currentUser();
    const userId = await currentUserId();

    if (!userId)
      return { error: { unauthorized: "Vous n'êtes pas autorisé." } };
    if (user.role !== "ADMIN")
      return { error: { unauthorized: "Vous n'êtes pas autorisé." } };

    for (let item of formData) {
      await prisma.chapter.update({
        where: { id: item.id },
        data: { position: item.position },
      });
    }

    console.log(`Course's chapters has been reordered. 🌱`);
    return { success: true };
  } catch (error) {
    console.log("[CHAPTER_ID_REORDER]", error);
    return { error: "Erreur interne veuillez rééassayer." };
  } finally {
    await prisma.$disconnect();
  }
};
