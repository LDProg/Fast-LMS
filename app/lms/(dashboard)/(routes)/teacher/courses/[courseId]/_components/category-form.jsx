"use client";

import { categoryCourseAction } from "@/actions/lms/courses/category-course-action";
import { Combo } from "@/components/ui/combo";
import { cn } from "@/lib/utils";
import { CategoryCourseSchema } from "@/schemas";
import { Button } from "@nextui-org/react";
import { useFormik } from "formik";
import { Pencil } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import { toast } from "sonner";

export const CategoryForm = ({ initialData, courseId, categories }) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", "),
    [selectedKeys]
  );

  const form = useFormik({
    enableReinitialize: true,
    initialValues: {
      courseId: courseId,
      categoryId: selectedValue || initialData?.categoryId || "",
    },
    validationSchema: CategoryCourseSchema,
    onSubmit: (values) => {
      startTransition(async () => {
        const data = await categoryCourseAction(values);

        if (data?.error?.unauthorized) {
          toast.error(data?.error.unauthorized);
          return redirect("/lms");
        }
        if (data?.error) {
          toast.error(data?.error);
          return;
        }
        if (data?.success) {
          toast.success("Catégorie ajoutée avec succès", {
            description: `Nouvelle catégorie :\n${selectedCategoryKeys?.label}`,
          });
        }
        toggleEdit();
        router.refresh();
      });
    },
  });

  const toggleEdit = () => setIsEditing((current) => !current);

  const selectedCategory = categories.find(
    (category) => category.value === initialData.categoryId
  );

  const selectedCategoryKeys = categories.find(
    (category) => category.value === selectedValue
  );

  return (
    <div className="mt-6 border border-muted-foreground/50 bg-background rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Catégorie du cours
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
              Modifier la catégorie
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p
          className={cn(
            "text-sm, mt-2",
            !initialData?.categoryId && "text-muted-foreground text-sm italic",
            initialData?.categoryId && "text-sm"
          )}
        >
          {selectedCategory?.label || "Aucune catégorie sélectionnée"}
        </p>
      )}
      {isEditing && (
        <form className="space-y-4 mt-4" onSubmit={form.handleSubmit}>
          <Combo
            categories={categories}
            initialValue={initialData}
            isPending={isPending}
            selectedKeys={selectedKeys}
            setSelectedKeys={setSelectedKeys}
          />
          <div className="flex items-center gap-x-2">
            <Button
              type="submit"
              className="bg-primary text-white rounded-sm"
              isLoading={isPending}
              isDisabled={
                initialData?.categoryId === form.values.categoryId || isPending
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
