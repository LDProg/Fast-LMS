"use client";

import { BeatLoader } from "react-spinners";
import { CardWrapper } from "./card-wrapper";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FormError } from "./form-error";
import { emailVerificationAction } from "@/actions/auth/email-verification-action";
import { FormSuccess } from "./form-success";

export const EmailVerificationForm = () => {
  const searchParams = useSearchParams();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (!token) {
      setError("Token manquant");
      return;
    }
    const data = emailVerificationAction(token);
    setError(data?.error);
    setSuccess(data?.success);
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Vérifier votre compte"
      backButtonLabel="Retour à la connexion"
      backButtonHref="/auth/login"
    >
      <div className="flex items-center w-full justify-center">
        {!success && !error && <BeatLoader color="#3671d6" />}
        <FormError message={error} />
        <FormSuccess message={success} />
      </div>
    </CardWrapper>
  );
};
