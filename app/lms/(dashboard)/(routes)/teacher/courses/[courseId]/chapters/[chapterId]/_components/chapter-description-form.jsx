"use client";

import { descriptonChapterAction } from "@/actions/lms/chapters/description-chapter-action";
import { Tiptap } from "@/components/lms/tiptap";
import { cn } from "@/lib/utils";
import { DescriptionChapterSchema } from "@/schemas";
import { Button } from "@nextui-org/react";
import { useFormik } from "formik";
import HTMLReactParser from "html-react-parser";
import { Pencil } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export const ChapterDescriptionForm = ({
  initialData,
  courseId,
  chapterId,
}) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState("");

  const form = useFormik({
    enableReinitialize: true,
    initialValues: {
      chapterId: chapterId,
      courseId: courseId,
      description: value || initialData?.description || "",
    },
    validationSchema: DescriptionChapterSchema,
    onSubmit: (values) => {
      startTransition(async () => {
        const data = await descriptonChapterAction(values);

        if (data?.error?.unauthorized) {
          toast.error(data?.error.unauthorized);
          return redirect("/lms");
        }
        if (data?.error) {
          toast.error(data?.error);
          return;
        }
        if (data?.success) {
          toast.success("Description modifiée avec succès");
        }
        toggleEdit();
        router.refresh();
      });
    },
  });

  const toggleEdit = () => setIsEditing((current) => !current);

  return (
    <div className="mt-6 border border-muted-foreground/50 bg-background rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Description du chapitre
        <Button
          variant="ghost"
          className="border-none rounded-sm flex justify-center"
          onClick={toggleEdit}
        >
          {isEditing ? (
            <>Annuler</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Modifier la description
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <div
          className={cn(
            "text-sm mt-2",
            !initialData?.description && "text-muted-foreground text-sm italic"
          )}
        >
          {(initialData?.description &&
            HTMLReactParser(initialData.description)) ||
            "Pas de descrition"}
        </div>
      )}
      {isEditing && (
        <form className="space-y-4 mt-4" onSubmit={form.handleSubmit}>
          <Tiptap
            value={form.values.description}
            setValue={setValue}
            onChange={setValue}
          />
          <div className="flex items-center gap-x-2">
            <Button
              type="submit"
              className="bg-primary text-white rounded-sm"
              isLoading={isPending}
              isDisabled={
                initialData?.description === form.values.description ||
                isPending
              }
            >
              Enregistrer
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};
