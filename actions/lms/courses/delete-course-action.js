"use server";

import { currentUser, currentUserId } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { DeleteCourseSchema } from "@/schemas";
import Mux from "@mux/mux-node";

const { Video } = new Mux(
  process.env.MUX_TOKEN_ID,
  process.env.MUX_TOKEN_SECRET
);

export const deleteCourseAction = async (formData) => {
  try {
    const isValid = await DeleteCourseSchema.isValid(formData);
    if (!isValid) {
      return { error: "Champs invalides" };
    }

    const user = await currentUser();
    const userId = await currentUserId();

    if (!userId)
      return { error: { unauthorized: "Vous n'êtes pas autorisé." } };
    if (user.role !== "ADMIN")
      return { error: { unauthorized: "Vous n'êtes pas autorisé." } };

    const { courseId } = formData;

    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        chapters: {
          include: { muxData: true },
        },
      },
    });

    if (!course) {
      return { error: "Le cours n'existe pas." };
    }

    for (const chapter of course.chapters) {
      if (chapter.muxData?.assetId) {
        await Video.Assets.del(chapter.muxData.assetId);
      }
    }

    const deletedCourse = await prisma.course.delete({
      where: { id: courseId },
    });

    console.log(`Course has been deleted. 🚮`);
    return { success: deletedCourse };
  } catch (error) {
    console.log("[COURSE_ID_DELETE]", error);
    return { error: "Erreur interne veuillez rééassayer." };
  } finally {
    await prisma.$disconnect();
  }
};
