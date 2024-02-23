"use server";

import { currentUser, currentUserId } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { DeleteAttachmentCourseSchema } from "@/schemas";

export const deleteAttachmentCourseAction = async (formData) => {
  try {
    const isValid = await DeleteAttachmentCourseSchema.isValid(formData);
    if (!isValid) {
      return { error: "Champs invalides" };
    }

    const user = await currentUser();
    const userId = await currentUserId();

    if (!userId)
      return { error: { unauthorized: "Vous n'êtes pas autorisé." } };
    if (user.role !== "ADMIN")
      return { error: { unauthorized: "Vous n'êtes pas autorisé." } };

    const { courseId, id } = formData;

    const attachment = await prisma.attachment.delete({
      where: { courseId, id },
    });

    console.log(`Course's attachment has been deleted. 🌱`);
    return { success: attachment };
  } catch (error) {
    console.log("[ATTACHMENT_ID_DELETE]", error);
    return { error: "Erreur interne veuillez rééassayer." };
  } finally {
    await prisma.$disconnect();
  }
};
