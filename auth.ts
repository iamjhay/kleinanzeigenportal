import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import dbConnect from "./lib/mongoose";
import User from "./models/User";
import Role from "./models/Role";
import bcrypt from "bcryptjs";
import { z } from "zod";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          await dbConnect();

          // Explicitly ensure Role model is registered before populate
          if (!Role) {
            console.error("[auth] Role model is not loaded");
          }

          const user = await User.findOne({ email })
            .select("+password")
            .populate("role");

          if (!user) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) {
            return {
              id: user._id.toString(),
              name: user.name,
              email: user.email,
              role: user.role.name,
              permissions: [...user.role.permissions], // Convert Mongoose array to plain array
            };
          }
        }

        return null;
      },
    }),
  ],
});
