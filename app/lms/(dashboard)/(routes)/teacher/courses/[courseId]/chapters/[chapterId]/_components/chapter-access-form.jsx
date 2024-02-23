"use client";

import { accessChapterAction } from "@/actions/lms/chapters/access-chapter-action";
import { cn } from "@/lib/utils";
import { AccessChapterSchema } from "@/schemas";
import { Button, Checkbox } from "@nextui-org/react";
import { IconCurrencyEuroOff } from "@tabler/icons-react";
import { useFormik } from "formik";
import { Pencil } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export const ChapterAccessForm = ({ initialData, courseId, chapterId }) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState(!!initialData?.isFree);

  const form = useFormik({
    enableReinitialize: true,
    initialValues: {
      chapterId: chapterId,
      courseId: courseId,
      isFree: value,
    },
    validationSchema: AccessChapterSchema,
    onSubmit: (values) => {
      startTransition(async () => {
        const data = await accessChapterAction(values);

        if (data?.error?.unauthorized) {
          toast.error(data?.error.unauthorized);
          return redirect("/lms");
        }
        if (data?.error) {
          toast.error(data?.error);
          return;
        }
        if (data?.success) {
          toast.success("Accès au chapitre modifié avec succès", {
            description: `Accès : ${values.isFree ? "Gratuit" : "Payant"}`,
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
        Accès du chapitre
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
              Modifier l&apos;accès
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <div
          className={cn(
            "text-sm mt-2",
            !initialData?.isFree && "text-muted-foreground text-sm italic"
          )}
        >
          {initialData?.isFree ? (
            <>Ce chapitre est gratuit</>
          ) : (
            <>Ce chapitre n&apos;est pas gratuit</>
          )}
        </div>
      )}
      {isEditing && (
        <form className="space-y-4 mt-4" onSubmit={form.handleSubmit}>
          <Checkbox
            icon={<IconCurrencyEuroOff color="white" />}
            color="primary"
            name="isFree"
            isSelected={value}
            onValueChange={setValue}
            isDisabled={isPending}
          >
            <span className="text-sm">
              Cochez cette case si vous souhaitez rendre ce chapitre gratuit
            </span>
          </Checkbox>
          <div className="flex items-center gap-x-2">
            <Button
              type="submit"
              className="bg-primary text-white rounded-sm"
              isLoading={isPending}
              isDisabled={initialData?.isFree === value || isPending}
            >
              Enregistrer
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};
