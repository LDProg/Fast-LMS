"use client";

import { descriptonCourseAction } from "@/actions/lms/courses/description-course-action";
import { cn } from "@/lib/utils";
import { DescriptionCourseSchema } from "@/schemas";
import { Button, Textarea } from "@nextui-org/react";
import { useFormik } from "formik";
import { Pencil } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export const DescriptionForm = ({ initialData, courseId }) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useFormik({
    initialValues: {
      courseId: courseId,
      description: initialData?.description || "",
    },
    validationSchema: DescriptionCourseSchema,
    onSubmit: (values) => {
      startTransition(async () => {
        const data = await descriptonCourseAction(values);

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
        Description du cours
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
        <p
          className={cn(
            "text-sm mt-2",
            !initialData?.description && "text-muted-foreground text-sm italic"
          )}
        >
          {initialData?.description || "Pas de descrition"}
        </p>
      )}
      {isEditing && (
        <form className="space-y-4 mt-4" onSubmit={form.handleSubmit}>
          <Textarea
            variant="bordered"
            size="md"
            className="mt-4"
            radius="sm"
            placeholder="Qu'allez-vous enseignez dans ce cours?"
            name="description"
            isDisabled={isPending}
            {...form.getFieldProps("description")}
            errorMessage={
              form.touched.description && form.errors.description
                ? form.errors.description
                : null
            }
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
