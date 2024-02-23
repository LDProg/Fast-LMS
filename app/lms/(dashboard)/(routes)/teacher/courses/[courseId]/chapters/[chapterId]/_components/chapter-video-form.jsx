"use client";

import { videoChapterAction } from "@/actions/lms/chapters/video-chapter-action";
import { FileUpload } from "@/components/lms/file-upload";
import { VideoChapterSchema } from "@/schemas";
import MuxPlayer from "@mux/mux-player-react";
import { Button } from "@nextui-org/react";
import { Pencil, PlusCircle, Video } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const ChapterVideoForm = ({ initialData, courseId, chapterId }) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);
  const onSubmit = async (values) => {
    const isValid = await VideoChapterSchema.isValid({
      ...values,
      courseId,
      chapterId,
    });

    if (!isValid) return;
    const data = await videoChapterAction({ ...values, courseId });

    if (data?.error?.unauthorized) {
      toast.error(data?.error.unauthorized);
      return redirect("/lms");
    }
    if (data?.error) {
      toast.error(data?.error);
      return;
    }
    if (data?.success) {
      toast.success("Vidéo ajoutée avec succès");
    }
    toggleEdit();
    router.refresh();
  };

  return (
    <div className="mt-6 border border-muted-foreground/50 bg-background rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Vidéo du chapitre
        <Button
          variant="ghost"
          className="border-none rounded-sm flex justify-center"
          onClick={toggleEdit}
        >
          {isEditing && <>Annuler</>}
          {!isEditing && !initialData?.videoUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Ajouter une vidéo
            </>
          )}
          {!isEditing && initialData?.videoUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Modifier la vidéo
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData?.videoUrl ? (
          <div className="flex items-center justify-center h-60 bg-background rounded-md">
            <Video className="h-10 w-10 text-muted-foreground/60" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2 rounded-md">
            <MuxPlayer playbackId={initialData?.muxData?.playbackId || ""} />
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="chapterVideo"
            onChange={(url) => {
              if (url) {
                onSubmit({ videoUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Télécharger une vidéo pour ce chapitre.
          </div>
        </div>
      )}
      {initialData?.videoUrl && !isEditing && (
        <div className="text-xs text-muted-foreground mt-2">
          Les vidéos peuvent prendre quelques minutes à télécharger. Recharger
          la page si la video n&apos;apparait pas.
        </div>
      )}
    </div>
  );
};
