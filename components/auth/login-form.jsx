"use client";

import { loginAction } from "@/actions/auth/login-action";
import { LoginSchema } from "@/schemas";
import { Button, Input } from "@nextui-org/react";
import { useFormik } from "formik";
import { useState, useTransition } from "react";
import { CardWrapper } from "./card-wrapper";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";

export const LoginForm = ({ clickRegister, setClickRegister }) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const form = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      setError("");
      setSuccess("");

      startTransition(async () => {
        const data = await loginAction(values);
        setError(data?.error);
        setSuccess(data?.success);
      });
    },
  });

  return (
    <CardWrapper
      headerLabel="Bienvenue"
      backButtonLabel="Nouveau? Créez un compte →"
      backButtonHref="/auth/register"
      clickRegister={clickRegister}
      setClickRegister={setClickRegister}
    >
      <form onSubmit={form.handleSubmit}>
        <Input
          radius="sm"
          type="email"
          label="Email"
          labelPlacement="outside"
          placeholder="exemple@exemple.com"
          size="lg"
          aria-label="email authentication"
          className="rounded-sm"
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
          placeholder="********"
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
          type="submit"
          className="w-full mt-2 rounded-md bg-foreground text-white font-medium dark:bg-slate-300 dark:text-black"
        >
          Se connecter
        </Button>
      </form>
    </CardWrapper>
  );
};
