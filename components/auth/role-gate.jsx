import { redirect } from "next/navigation";
import { FormError } from "./form-error";
import { currentRole } from "@/lib/auth";

export const RoleGate = async ({ children, allowedRole }) => {
  const role = await currentRole();

  if (role !== allowedRole) {
    // return <FormError message="Vous n'êtes pas autorisé à voir cette page" />;
    redirect("/auth/login");
  }

  return <div>{children}</div>;
};
