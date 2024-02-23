"use server";

import { currentUser, currentUserId } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { AttachmentCourseSchema } from "@/schemas";

export const attachmentCourseAction = async (formData) => {
  try {
    const isValid = await AttachmentCourseSchema.isValid(formData);
    if (!isValid) {
      return { error: "Champs invalides" };
    }

    const user = await currentUser();
    const userId = await currentUserId();

    if (!userId)
      return { error: { unauthorized: "Vous n'êtes pas autorisé." } };
    if (user.role !== "ADMIN")
      return { error: { unauthorized: "Vous n'êtes pas autorisé." } };

    const { url, courseId, attachment } = formData;

    const course = await prisma.attachment.create({
      data: {
        url,
        name: url.split("/").pop(),
        courseId,
        attachment,
      },
    });

    console.log(`Course's image has been uploaded. 🌱`);
    return { success: course };
  } catch (error) {
    console.log("[COURSE__ID_ATTACHMENT]", error);
    return { error: "Erreur interne veuillez rééassayer." };
  } finally {
    await prisma.$disconnect();
  }
};
