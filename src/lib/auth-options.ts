import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../lib/prisma";
import { compare } from "bcryptjs";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        cedula: { label: "Cedula", type: "text", placeholder: "Tu cédula" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.cedula || !credentials.password) {
          throw new Error("Cedula and password are required");
        }

        const user = await prisma.rAE_Funcionarios.findFirst({
          where: { Cedula: credentials.cedula },
        });

        if (!user) {
          throw new Error("No user found with the provided cedula");
        }

        const isValidPassword = await compare(credentials.password, user.Password);

        if (!isValidPassword) {
          throw new Error("Incorrect password");
        }

        return {
          id: String(user.Id_funcionario),
          name: `${user.Primer_nombre} ${user.Primer_apellido}`,
          email: null,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 15 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/homepages/auth/login",
  },
};
