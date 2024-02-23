import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import bcrypt from "bcryptjs";
import { LoginSchema } from "./schemas";
import { getUserByEmail } from "./utils/user";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const isValidForm = await LoginSchema.isValid(credentials);

        if (isValidForm) {
          const { email, password } = credentials;
          const user = await getUserByEmail(email);
          if (!user?.password) return null;

          const passwordMatch = bcrypt.compareSync(
            password as string,
            user.password
          );

          if (passwordMatch) return Promise.resolve(user);
        }

        return null;
      },
    }),
  ],
  trustHost: true,
} satisfies NextAuthConfig;
