"use server";

import { currentUser, currentUserId } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { DescriptionCourseSchema } from "@/schemas";

export const descriptonCourseAction = async (formData) => {
  try {
    const isValid = await DescriptionCourseSchema.isValid(formData);
    if (!isValid) {
      return { error: "Champs invalides" };
    }

    const user = await currentUser();
    const userId = await currentUserId();

    if (!userId)
      return { error: { unauthorized: "Vous n'êtes pas autorisé." } };
    if (user.role !== "ADMIN")
      return { error: { unauthorized: "Vous n'êtes pas autorisé." } };

    const { courseId, description } = formData;

    const course = await prisma.course.update({
      where: { id: courseId },
      data: {
        description,
      },
    });

    console.log(`Course's description has been updated. 🌱`);
    return { success: course };
  } catch (error) {
    console.log("[COURSES_ID_DESCRIPTION]", error);
    return { error: "Erreur interne veuillez rééassayer." };
  } finally {
    await prisma.$disconnect();
  }
};
