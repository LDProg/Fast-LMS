"use client";

import { chaptersCourseAction } from "@/actions/lms/courses/chapters-course-action";
import { reorderChaptersCourseAction } from "@/actions/lms/courses/reorder-chapters-course-action";
import { cn } from "@/lib/utils";
import { ChaptersCourseSchema } from "@/schemas";
import { Button, Input } from "@nextui-org/react";
import { useFormik } from "formik";
import { Loader2, PlusCircle } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { ChaptersList } from "./chapters-list";

export const ChaptersForm = ({ initialData, courseId }) => {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useFormik({
    initialValues: {
      courseId: courseId,
      title: "",
    },
    validationSchema: ChaptersCourseSchema,
    onSubmit: (values) => {
      startTransition(async () => {
        const data = await chaptersCourseAction(values);

        if (data?.error?.unauthorized) {
          toast.error(data?.error.unauthorized);
          return redirect("/lms");
        }
        if (data?.error) {
          toast.error(data?.error);
          return;
        }
        if (data?.success) {
          toast.success("Chapitre créé avec succès", {
            description: values.title,
          });
        }
        toggleCreating();
        router.refresh();
        form.resetForm();
      });
    },
  });

  const toggleCreating = () => setIsCreating((current) => !current);

  const onReorder = async (updatedData) => {
    setIsUpdating(true);

    const data = await reorderChaptersCourseAction(updatedData);
    if (data?.error?.unauthorized) {
      toast.error(data?.error.unauthorized);
      return redirect("/lms");
    }
    if (data?.error) {
      toast.error(data?.error);
      return;
    }
    if (data?.success) {
      toast.success("Chapitres réorganisés avec succès");
    }

    setIsUpdating(false);
    router.refresh();
  };

  const onEdit = (id) => {
    router.push(`/lms/teacher/courses/${courseId}/chapters/${id}`);
  };

  return (
    <div className="relative mt-6 border border-muted-foreground/50 bg-background rounded-md p-4">
      {isUpdating && (
        <div className="absolute h-full w-full bg-muted top-0 right-0 rounded-md flex items-center justify-center">
          <Loader2 className="animate-spin h-6 w-6 text-primary z-20" />
        </div>
      )}
      <div className="font-medium flex items-center justify-between">
        Chapitres du cours
        <Button
          variant="ghost"
          className="border-none rounded-sm flex justify-center"
          onClick={toggleCreating}
        >
          {isCreating ? (
            <>Annuler</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Ajouter un chapitre
            </>
          )}
        </Button>
      </div>
      {isCreating && (
        <form className="space-y-4 mt-4" onSubmit={form.handleSubmit}>
          <Input
            variant="bordered"
            size="md"
            className="mt-4"
            radius="sm"
            placeholder="Introduction du cours"
            name="title"
            isDisabled={isPending}
            {...form.getFieldProps("title")}
            errorMessage={
              form.touched.title && form.errors.title ? form.errors.title : null
            }
          />

          <Button
            type="submit"
            className="bg-primary text-white rounded-sm"
            isLoading={isPending}
            isDisabled={!form.values.title || isPending}
          >
            Créer
          </Button>
        </form>
      )}
      {!isCreating && (
        <div
          className={cn(
            "text-sm mt-2",
            !initialData.chapters.length && "text-muted-foreground italic"
          )}
        >
          {!initialData.chapters.length && "Aucun chapitre"}
          <ChaptersList
            onEdit={onEdit}
            onReorder={onReorder}
            items={initialData.chapters || []}
          />
        </div>
      )}
      {!isCreating && (
        <p className="text-xs text-muted-foreground mt-4">
          Restez appuyer sur un chapitre pour le réorganiser
        </p>
      )}
    </div>
  );
};
