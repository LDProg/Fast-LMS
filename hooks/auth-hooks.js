import { useSession } from "next-auth/react";

export const useCurrentUser = () => {
  const session = useSession();
  return session.data?.user;
};

export const useCurrentUserEmail = () => {
  const session = useSession();
  return session.data?.user?.email;
};

export const useCurrentUserRole = () => {
  const session = useSession();
  return session.data?.user?.role;
};

export const useCurrentUserId = () => {
  const session = useSession();

  return session.data?.user?.id;
};
