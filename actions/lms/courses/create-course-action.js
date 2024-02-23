"use server";

import { currentUser, currentUserId } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { CreateCourseSchema } from "@/schemas";

export const createCourseAction = async (formData) => {
  try {
    const isValid = await CreateCourseSchema.isValid(formData);
    if (!isValid) {
      return { error: "Champs invalides" };
    }

    const user = await currentUser();
    const userId = await currentUserId();

    if (!userId)
      return { error: { unauthorized: "Vous n'êtes pas autorisé." } };
    if (user.role !== "ADMIN")
      return { error: { unauthorized: "Vous n'êtes pas autorisé." } };

    const { title } = formData;

    const course = await prisma.course.create({
      data: {
        userId,
        title,
      },
    });

    console.log(`Course has been created. 🌱`);
    return { success: course };
  } catch (error) {
    console.log("[COURSES_ID_CREATE]", error);
    return { error: "Erreur interne veuillez rééassayer." };
  } finally {
    await prisma.$disconnect();
  }
};
