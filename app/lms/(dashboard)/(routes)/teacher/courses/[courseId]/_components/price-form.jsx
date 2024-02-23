"use client";

import { priceCourseAction } from "@/actions/lms/courses/price-course-action";
import { formatPrice } from "@/lib/format-price";
import { cn } from "@/lib/utils";
import { PriceCourseSchema } from "@/schemas";
import { Button, Input } from "@nextui-org/react";
import { useFormik } from "formik";
import { Pencil } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export const PriceForm = ({ initialData, courseId }) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useFormik({
    initialValues: {
      courseId: courseId,
      price: initialData?.price || undefined,
    },
    validationSchema: PriceCourseSchema,
    onSubmit: (values) => {
      startTransition(async () => {
        const data = await priceCourseAction(values);

        if (data?.error?.unauthorized) {
          toast.error(data?.error.unauthorized);
          return redirect("/lms");
        }
        if (data?.error) {
          toast.error(data?.error);
          return;
        }
        if (data?.success) {
          const description =
            values.price > 0 && values.price !== null
              ? `Nouveau prix : ${formatPrice(values.price)}`
              : "Gratuit";
          toast.success("Prix modifié avec succès", {
            description: description,
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
        Prix du cours
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
              Modifier le prix
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p
          className={cn(
            "text-sm mt-2",
            !initialData?.price && "text-muted-foreground text-sm italic"
          )}
        >
          {initialData?.price ? formatPrice(initialData.price) : "Pas de prix"}
        </p>
      )}
      {isEditing && (
        <form className="space-y-4 mt-4" onSubmit={form.handleSubmit}>
          <Input
            variant="bordered"
            size="md"
            className="mt-4"
            radius="sm"
            placeholder="69,99€"
            name="price"
            type="number"
            step="0.01"
            isDisabled={isPending}
            {...form.getFieldProps("price")}
            errorMessage={
              form.touched.price && form.errors.price ? form.errors.price : null
            }
          />

          <div className="flex items-center gap-x-2">
            <Button
              type="submit"
              className="bg-primary text-white rounded-sm"
              isLoading={isPending}
              isDisabled={initialData?.price === form.values.price || isPending}
            >
              Enregistrer
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};
