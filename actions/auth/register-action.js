"use server";

import { signIn } from "@/auth";
import prisma from "@/lib/prisma";
import {
  DEFAULT_ADMIN_LOGGEDIN_REDIRECT,
  DEFAULT_LOGGEDIN_REDIRECT,
} from "@/route";
import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/utils/user";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";

export const registerAction = async (formData) => {
  try {
    console.log("register action 🌱");
    const isValid = await RegisterSchema.isValid(formData);

    if (!isValid) {
      return { error: "Champs invalides" };
    }

    const { firstName, lastName, email, password } = formData;
    const hashedPassword = await bcrypt.hash(password, 10);
    const isAlreadyRegistered = await getUserByEmail(email);

    if (isAlreadyRegistered) {
      return { error: "L'email est déjà utilisé" };
    }

    const existingUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });

    // Email verification logic
    // const verificationToken = await generateVerificationToken(email);
    // await sendVerificationEmail(
    //   verificationToken.email,
    //   verificationToken.token
    // );
    // return { success: "Un email de confirmation vous a été envoyé" };

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

    return { success: "Inscription réussie" };
  } catch (err) {
    throw err;
  } finally {
    prisma.$disconnect();
  }
};
