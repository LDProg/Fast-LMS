"use client";

import { imageCourseAction } from "@/actions/lms/courses/image-course-action";
import { FileUpload } from "@/components/lms/file-upload";
import { ImageCourseSchema } from "@/schemas";
import { Button } from "@nextui-org/react";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const ImageForm = ({ initialData, courseId }) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);
  const onSubmit = async (values) => {
    const isValid = await ImageCourseSchema.isValid({ ...values, courseId });

    if (!isValid) return;
    const data = await imageCourseAction({ ...values, courseId });

    if (data?.error?.unauthorized) {
      toast.error(data?.error.unauthorized);
      return redirect("/lms");
    }
    if (data?.error) {
      toast.error(data?.error);
      return;
    }
    if (data?.success) {
      toast.success("Image ajoutée avec succès");
    }
    toggleEdit();
    router.refresh();
  };

  return (
    <div className="mt-6 border border-muted-foreground/50 bg-background rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Image du cours
        <Button
          variant="ghost"
          className="border-none rounded-sm flex justify-center"
          onClick={toggleEdit}
        >
          {isEditing && <>Annuler</>}
          {!isEditing && !initialData?.imageUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Ajouter une image
            </>
          )}
          {!isEditing && initialData?.imageUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Modifier l&apos;image
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData?.imageUrl ? (
          <div className="flex items-center justify-center h-60 bg-background rounded-md">
            <ImageIcon className="h-10 w-10 text-muted-foreground/60" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2 rounded-md">
            <Image
              alt="upload"
              fill
              className="object-cover rounded-md"
              src={initialData?.imageUrl}
            />
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseImage"
            onChange={(url) => {
              if (url) {
                onSubmit({ imageUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Format 16:9 recommandé
          </div>
        </div>
      )}
    </div>
  );
};
