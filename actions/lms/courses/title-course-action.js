"use server";

import { currentUser, currentUserId } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { TitleCourseSchema } from "@/schemas";

export const titleCourseAction = async (formData) => {
  try {
    const isValid = await TitleCourseSchema.isValid(formData);
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

    const course = await prisma.course.update({
      where: { id: courseId },
      data: {
        title,
      },
    });

    console.log(`Course's title has been updated. 🌱`);
    return { success: course };
  } catch (error) {
    console.log("[COURSES_ID_TITLE]", error);
    return { error: "Erreur interne veuillez rééassayer." };
  } finally {
    await prisma.$disconnect();
  }
};
