"use server";

import { signIn } from "@/auth";
import {
  DEFAULT_ADMIN_LOGGEDIN_REDIRECT,
  DEFAULT_LOGGEDIN_REDIRECT,
} from "@/route";
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/utils/user";
import { AuthError } from "next-auth";

export const loginAction = async (formData) => {
  const isValid = await LoginSchema.isValid(formData);
  if (!isValid) {
    return { error: "Champs invalides" };
  }

  const { email, password } = formData;

  const existingUser = await getUserByEmail(email);

  if (!existingUser?.email || !existingUser?.password) {
    return { error: "L'email n'existe pas" };
  }

  // Email verification logic
  // if (!existingUser.emailVerified) {
  //   const verificationToken = await generateVerificationToken(
  //     existingUser.email
  //   );

  //   await sendVerificationEmail(
  //     verificationToken.email,
  //     verificationToken.token
  //   );

  // return { success: "Un email de confirmation vous a été envoyé" };
  // }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo:
        existingUser.role === "ADMIN"
          ? DEFAULT_ADMIN_LOGGEDIN_REDIRECT
          : DEFAULT_LOGGEDIN_REDIRECT,
    });
  } catch (err) {
    if (err instanceof AuthError) {
      if (err.type === "CredentialsSignin") {
        return { error: "Les champs sont invalides" };
      } else return { error: "Une erreur s'est produite veuillez réessayer" };
    }
    throw err;
  }

  return { success: "Connexion autorisée" };
};
