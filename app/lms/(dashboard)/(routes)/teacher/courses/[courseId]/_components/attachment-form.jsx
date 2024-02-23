"use client";

import { attachmentCourseAction } from "@/actions/lms/courses/attachment-course-action";
import { deleteAttachmentCourseAction } from "@/actions/lms/courses/delete-attachment-course-action";
import { FileUpload } from "@/components/lms/file-upload";
import { AttachmentCourseSchema } from "@/schemas";
import { Button } from "@nextui-org/react";
import { File, Loader2, Pencil, PlusCircle, X } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const AttachmentForm = ({ initialData, courseId }) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const toggleEdit = () => setIsEditing((current) => !current);
  const onSubmit = async (values) => {
    const isValid = await AttachmentCourseSchema.isValid({
      ...values,
      courseId,
    });

    if (!isValid) return;
    const data = await attachmentCourseAction({ ...values, courseId });

    if (data?.error?.unauthorized) {
      toast.error(data?.error.unauthorized);
      return redirect("/lms");
    }
    if (data?.error) {
      toast.error(data?.error);
      return;
    }
    if (data?.success) {
      toast.success("Document ajoutée avec succès");
    }
    toggleEdit();
    router.refresh();
  };

  const onDelete = async (id) => {
    setDeletingId(id);
    const data = await deleteAttachmentCourseAction({ id, courseId });
    if (data?.error?.unauthorized) {
      toast.error(data?.error.unauthorized);
      return redirect("/lms");
    }
    if (data?.error) {
      toast.error(data?.error);
      return;
    }
    if (data?.success) {
      toast.success("Fichier supprimé avec succès");
    }
    setDeletingId(null);
    router.refresh();
  };

  return (
    <div className="mt-6 border border-muted-foreground/50 bg-background rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Ressources du cours
        <Button
          variant="ghost"
          type="button"
          className="border-none rounded-sm flex justify-center"
          onClick={toggleEdit}
        >
          {isEditing && <>Annuler</>}
          {!isEditing && !initialData?.url && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Ajouter un document
            </>
          )}
          {!isEditing && initialData?.url && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Modifier le document
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          {initialData?.attachments.length === 0 && (
            <p className="text-sm mt-2 text-muted-foreground italic">
              Aucune pièce jointe
            </p>
          )}
          {initialData?.attachments.length > 0 && (
            <div className="space-y-2">
              {initialData.attachments.map((attachment) => {
                return (
                  <div
                    key={attachment.id}
                    className="flex items-center p-3 w-full bg-background border-muted-foreground/60 border rounded-md"
                  >
                    <File className="h-4 w-4 mr-2 flex-shrink-0" />
                    <p className="text-xs line-clamp-1">{attachment.name}</p>
                    {deletingId === attachment.id && (
                      <div className="p-0 w-fit ml-auto hover:opacity-75 transition">
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </div>
                    )}
                    {deletingId !== attachment.id && (
                      <button
                        onClick={() => onDelete(attachment.id)}
                        className="p-0 w-fit ml-auto hover:opacity-75 transition"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({ url: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Ajoutez tous les documents dont les apprenants ont besoin pour
            valider le cours.
          </div>
        </div>
      )}
    </div>
  );
};
