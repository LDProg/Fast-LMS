"use client";

import { registerAction } from "@/actions/auth/register-action";
import { RegisterSchema } from "@/schemas";
import { Button, Input } from "@nextui-org/react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { CardWrapper } from "./card-wrapper";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";

export const RegisterForm = ({ clickRegister, setClickRegister }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const form = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      setError("");
      setSuccess("");

      startTransition(async () => {
        const data = await registerAction(values);
        setError(data.error);
        setSuccess(data.success);
      });
    },
  });

  return (
    <CardWrapper
      headerLabel="Bienvenue"
      backButtonLabel="Déjà inscrit? Connectez-vous →"
      backButtonHref="/auth/login"
      clickRegister={clickRegister}
      setClickRegister={setClickRegister}
    >
      <form onSubmit={form.handleSubmit}>
        <Input
          radius="sm"
          type="firstName"
          label="Prénom"
          labelPlacement="outside"
          size="lg"
          aria-label="Firstname authentication"
          className="rounded-sm"
          name="firstName"
          isDisabled={isPending}
          {...form.getFieldProps("firstName")}
          errorMessage={
            form.touched.firstName && form.errors.firstName
              ? form.errors.firstName
              : null
          }
        />

        <Input
          radius="sm"
          type="lastName"
          label="Nom"
          labelPlacement="outside"
          size="lg"
          aria-label="Lastname authentication"
          className="pt-3 rounded-sm"
          name="lastName"
          isDisabled={isPending}
          {...form.getFieldProps("lastName")}
          errorMessage={
            form.touched.lastName && form.errors.lastName
              ? form.errors.lastName
              : null
          }
        />

        <Input
          radius="sm"
          type="email"
          label="Email"
          labelPlacement="outside"
          size="lg"
          aria-label="email authentication"
          className="pt-3 rounded-sm"
          name="email"
          isDisabled={isPending}
          {...form.getFieldProps("email")}
          errorMessage={
            form.touched.email && form.errors.email ? form.errors.email : null
          }
        />

        <Input
          radius="sm"
          type="password"
          label="Mot de passe"
          labelPlacement="outside"
          size="lg"
          aria-label="password authentication"
          className="pt-3 pb-9 rounded-sm"
          name="password"
          isDisabled={isPending}
          {...form.getFieldProps("password")}
          errorMessage={
            form.touched.password && form.errors.password
              ? form.errors.password
              : null
          }
        />

        <FormError message={error} />
        <FormSuccess message={success} />
        <Button
          isLoading={isPending}
          isDisabled={isPending}
          type="submit"
          className="w-full mt-2 rounded-md bg-foreground text-white font-medium dark:bg-slate-300 dark:text-black"
        >
          S&apos;inscrire
        </Button>
      </form>
    </CardWrapper>
  );
};
