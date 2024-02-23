"use server";

import { currentUser, currentUserId } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { CategoryCourseSchema } from "@/schemas";

export const categoryCourseAction = async (formData) => {
  try {
    const isValid = await CategoryCourseSchema.isValid(formData);
    if (!isValid) {
      return { error: "Champs invalides" };
    }

    const user = await currentUser();
    const userId = await currentUserId();

    if (!userId)
      return { error: { unauthorized: "Vous n'êtes pas autorisé." } };
    if (user.role !== "ADMIN")
      return { error: { unauthorized: "Vous n'êtes pas autorisé." } };

    const { courseId, categoryId } = formData;

    const course = await prisma.course.update({
      where: { id: courseId },
      data: {
        categoryId,
      },
    });

    console.log(`Course's category has been updated. 🌱`);
    return { success: course };
  } catch (error) {
    console.log("[COURSES_ID_CATEGORY]", error);
    return { error: "Erreur interne veuillez rééassayer." };
  } finally {
    await prisma.$disconnect();
  }
};
