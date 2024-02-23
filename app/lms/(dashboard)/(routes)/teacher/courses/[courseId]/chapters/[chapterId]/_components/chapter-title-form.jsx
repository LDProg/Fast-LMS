"use client";

import { titleChapterAction } from "@/actions/lms/chapters/title-chapter-action";
import { TitleChapterSchema } from "@/schemas";
import { Button, Input } from "@nextui-org/react";
import { useFormik } from "formik";
import { Pencil } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export const ChapterTitleForm = ({ initialData, courseId, chapterId }) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useFormik({
    initialValues: {
      courseId: courseId,
      chapterId: chapterId,
      title: initialData?.title || "",
    },
    validationSchema: TitleChapterSchema,
    onSubmit: (values) => {
      startTransition(async () => {
        const data = await titleChapterAction(values);

        if (data?.error?.unauthorized) {
          toast.error(data?.error.unauthorized);
          return redirect("/lms");
        }
        if (data?.error) {
          toast.error(data?.error);
          return;
        }
        if (data?.success) {
          toast.success("Titre modifié avec succès", {
            description: `Nouveau titre : ${values.title}`,
          });
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
        Titre du chapitre
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
              Modifier le titre
            </>
          )}
        </Button>
      </div>
      {!isEditing && <p className="text-sm mt-4">{initialData?.title}</p>}
      {isEditing && (
        <form className="space-y-4 mt-4" onSubmit={form.handleSubmit}>
          <Input
            variant="bordered"
            size="md"
            className="mt-4"
            radius="sm"
            placeholder="ex: Introduction du cours"
            name="title"
            isDisabled={isPending}
            {...form.getFieldProps("title")}
            errorMessage={
              form.touched.title && form.errors.title ? form.errors.title : null
            }
          />
          <div className="flex items-center gap-x-2">
            <Button
              type="submit"
              className="bg-primary text-white rounded-sm"
              isLoading={isPending}
              isDisabled={initialData?.title === form.values.title || isPending}
            >
              Enregistrer
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};
