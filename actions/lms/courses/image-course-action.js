"use server";

import { currentUser, currentUserId } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { ImageCourseSchema } from "@/schemas";

export const imageCourseAction = async (formData) => {
  try {
    const isValid = await ImageCourseSchema.isValid(formData);
    if (!isValid) {
      return { error: "Champs invalides" };
    }

    const user = await currentUser();
    const userId = await currentUserId();

    if (!userId)
      return { error: { unauthorized: "Vous n'êtes pas autorisé." } };
    if (user.role !== "ADMIN")
      return { error: { unauthorized: "Vous n'êtes pas autorisé." } };

    const { courseId, imageUrl } = formData;

    const course = await prisma.course.update({
      where: {
        id: courseId,
      },
      data: {
        imageUrl,
      },
    });

    console.log(`Course's image has been uploaded. 🌱`);
    return { success: course };
  } catch (error) {
    console.log("[COURSES_ID_IMAGE]", error);
    return { error: "Erreur interne veuillez rééassayer." };
  } finally {
    await prisma.$disconnect();
  }
};
