import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const checkSession = async () => {
  try {
    const session = await auth();

    if (!session?.user?.id) return { error: "Vous n'êtes pas autorisé." };

    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    if (!user?.id) return { error: "Vous n'êtes pas autorisé." };

    return user;
  } catch (err) {
    return { error: "Vous n'êtes pas autorisé." };
  } finally {
    await prisma.$disconnect();
  }
};
