"use server";

import { currentUser, currentUserId } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { VideoChapterSchema } from "@/schemas";
import Mux from "@mux/mux-node";

export const videoChapterAction = async (formData) => {
  try {
    const isValid = await VideoChapterSchema.isValid(formData);
    if (!isValid) {
      return { error: "Champs invalides" };
    }

    const user = await currentUser();
    const userId = await currentUserId();

    if (!userId)
      return { error: { unauthorized: "Vous n'êtes pas autorisé." } };
    if (user.role !== "ADMIN")
      return { error: { unauthorized: "Vous n'êtes pas autorisé." } };

    const { videoUrl, chapterId } = formData;

    const { Video } = new Mux(
      process.env.MUX_TOKEN_ID,
      process.env.MUX_TOKEN_SECRET
    );

    if (videoUrl) {
      const existingMuxData = await prisma.muxData.findFirst({
        where: {
          videoUrl,
        },
      });

      if (existingMuxData) {
        await Video.Assets.del(existingMuxData.assetId);
        await prisma.muxData.delete({
          where: {
            id: existingMuxData.id,
          },
        });
      }

      const asset = await Video.Assets.create({
        input: videoUrl,
        playback_policy: "public",
        text: false,
      });

      await prisma.muxData.create({
        data: {
          chapterId,
          videoUrl,
          assetId: asset.id,
          playbackId: asset.playback_ids?.[0]?.id,
        },
      });
      console.log(`Chapter's video has been uploaded. 🌱`);
      return { success: asset };
    }
  } catch (error) {
    console.log("[CHAPTER_ID_VIDEO]", error);
    return { error: "Erreur interne veuillez rééassayer." };
  } finally {
    await prisma.$disconnect();
  }
};
