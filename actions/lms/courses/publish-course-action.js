"use server";

import { currentUser, currentUserId } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { PublishCourseSchema } from "@/schemas";

export const publishCourseAction = async (formData) => {
  try {
    const isValid = await PublishCourseSchema.isValid(formData);
    if (!isValid) {
      return { error: "Champs invalides" };
    }

    const user = await currentUser();
    const userId = await currentUserId();

    if (!userId)
      return { error: { unauthorized: "Vous n'êtes pas autorisé." } };
    if (user.role !== "ADMIN")
      return { error: { unauthorized: "Vous n'êtes pas autorisé." } };

    const { isPublished, courseId } = formData;

    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
      include: {
        chapters: {
          include: {
            muxData: true,
          },
        },
      },
    });

    if (!course) {
      return { error: "Le cours n'existe pas." };
    }

    if (isPublished) {
      const unPublishedCourse = await prisma.course.update({
        where: { id: courseId },
        data: {
          isPublished: false,
          publishedAt: null,
        },
      });

      console.log(`Course has been unpublished. 🌱`);
      return { success: unPublishedCourse };
    } else {
      const hasPublishedChapter = course.chapters.some(
        (chapter) => chapter.isPublished
      );

      if (
        !course.title ||
        !course.description ||
        // !course.imageUrl ||
        !course.categoryId ||
        !hasPublishedChapter ||
        !course.chapters.some((chapter) => chapter.isPublished)
      )
        return { error: "Champs manquants" };

      const publishedCourse = await prisma.course.update({
        where: {
          id: courseId,
        },
        data: {
          isPublished: true,
          publishedAt: new Date(),
        },
      });

      console.log(`Course has been published. 🌱`);
      return { success: publishedCourse };
    }
  } catch (error) {
    console.log("[COURSE_ID_PUBLISH]", error);
    return { error: "Erreur interne veuillez rééassayer." };
  } finally {
    await prisma.$disconnect();
  }
};
