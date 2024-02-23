"use server";

import { signOut } from "@/auth";

export const logoutAction = async () => {
  return await signOut();
};
