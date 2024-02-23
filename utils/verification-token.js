import prisma from "@/lib/prisma";

export const getVerificationTokenByToken = async (token) => {
  try {
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    });

    return verificationToken;
  } catch (err) {
    throw err;
  } finally {
    prisma.$disconnect();
  }
};

export const getVerificationTokenByEmail = async (email) => {
  try {
    const verificationToken = await prisma.verificationToken.findFirst({
      where: { email },
    });

    return verificationToken;
  } catch (err) {
    throw err;
  } finally {
    prisma.$disconnect();
  }
};
