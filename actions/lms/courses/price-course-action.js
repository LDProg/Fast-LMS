"use server";

import { currentUser, currentUserId } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { PriceCourseSchema } from "@/schemas";

export const priceCourseAction = async (formData) => {
  try {
    const isValid = await PriceCourseSchema.isValid(formData);
    if (!isValid) {
      return { error: "Champs invalides schema" };
    }

    const user = await currentUser();
    const userId = await currentUserId();

    if (!userId)
      return { error: { unauthorized: "Vous n'êtes pas autorisé." } };
    if (user.role !== "ADMIN")
      return { error: { unauthorized: "Vous n'êtes pas autorisé." } };

    const { courseId, price } = formData;

    const course = await prisma.course.update({
      where: { id: courseId },
      data: {
        price: price !== 0 ? price : null,
      },
    });

    console.log(`Course's price has been updated. 🌱`);
    return { success: course };
  } catch (error) {
    console.log("[COURSES_ID_PRICE]", error);
    return { error: "Erreur interne veuillez rééassayer." };
  } finally {
    await prisma.$disconnect();
  }
};
