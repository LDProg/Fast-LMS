"use client";

import { createCourseAction } from "@/actions/lms/courses/create-course-action";
import { CreateCourseSchema } from "@/schemas";
import { Button, Input, Link } from "@nextui-org/react";
import { useFormik } from "formik";
import { redirect, useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export const LmsCreateCourseForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: CreateCourseSchema,
    onSubmit: (values) => {
      startTransition(async () => {
        const data = await createCourseAction(values);
        if (data?.error?.unauthorized) {
          toast.error("Vous n'êtes pas autorisé.");
          return redirect("/lms");
        }
        if (data?.error) {
          toast.error("Une erreur s'est produite! Veuillez réessayer.");
          return;
        }
        if (data?.success) {
          toast.success("Cours créé avec succès! 📚", {
            description: values.title,
          });
        }
        router.push(`/lms/teacher/courses/${data.success.id}`);
      });
    },
  });

  return (
    <form className="flex flex-col" onSubmit={form.handleSubmit}>
      <h1 className="text-2xl">Choisissez le titre de votre cours</h1>
      <p className="text-sm text-muted-foreground/60">
        Quel nom voulez-vous donnez à votre cours?
        <br /> Vous pourrez le changez au besoin.
      </p>
      <div className="space-y-8 mt-8">
        <Input
          variant="bordered"
          label="Titre"
          labelPlacement="outside"
          size="lg"
          className="mb-4"
          radius="sm"
          placeholder="Qu'allez-vous enseignez dans ce cours?"
          name="title"
          isDisabled={isPending}
          {...form.getFieldProps("title")}
          errorMessage={
            form.touched.title && form.errors.title ? form.errors.title : null
          }
        />
      </div>
      <div className="w-full flex justify-end mt-4 mb-2">
        <Button className="rounded-md" as={Link} href="/lms/teacher/courses">
          Retour
        </Button>
        <Button
          type="submit"
          className="bg-primary ml-2 text-white rounded-md"
          isLoading={isPending}
          isDisabled={isPending}
        >
          Confirmer
        </Button>
      </div>
    </form>
  );
};
