"use client";

import { updateUserProgressAction } from "@/actions/lms/courses/update-user-progress-action";
import { useConfettiStore } from "@/hooks/confetti-hooks";
import { cn } from "@/lib/utils";
import MuxPlayer from "@mux/mux-player-react";
import { Loader2, Lock, VideoOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const VideoPlayer = ({
  chapterId,
  courseId,
  title,
  nextChapterId,
  playbackId,
  isLocked,
  completeOnEnd,
}) => {
  const router = useRouter();
  const confetti = useConfettiStore();
  const [isReady, setIsReady] = useState(false);

  const onEnd = async () => {
    try {
      if (completeOnEnd) {
        const response = await updateUserProgressAction({
          chapterId,
          isCompleted: true,
        });

        if (response?.error?.unauthorized) {
          toast.error(response.error.unauthorized);
          return router.push("/auth/login");
        }
        if (response?.error) {
          toast.error(response.error);
          return;
        }
        if (response?.success) {
          if (!nextChapterId) {
            toast.success("Cours terminé !");
          } else if (nextChapterId) {
            toast.success("Chapitre suivant");
          } else {
            toast.success("Chapitre non complété");
          }
        }

        if (!nextChapterId) {
          confetti.onOpen();
        }

        if (nextChapterId) {
          router.push(`/lms/courses/${courseId}/chapters/${nextChapterId}`);
        }

        router.refresh();
      }
    } catch (error) {
      toast.error("Une erreur s'est produite");
      console.error(error);
    }
  };

  return (
    <div className="relative aspect-video">
      {playbackId ? (
        !isReady &&
        !isLocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        )
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
          <VideoOff className="h-8 w-8 animate-spin" />
        </div>
      )}
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2">
          <Lock className="h-8 w-8" />
          <p className="text-sm">Ce chapitre est vérrouiller</p>
        </div>
      )}
      {!isLocked && (
        <MuxPlayer
          title={title}
          className={cn(!isReady && "hidden")}
          onCanPlay={() => setIsReady(true)}
          onEnded={onEnd}
          autoPlay
          playbackId={playbackId}
        />
      )}
    </div>
  );
};
