import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../../../lib/prisma"; 
import { compare } from "bcryptjs";

const handler = NextAuth({
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
        console.log('las credenciales son ', credentials.cedula, credentials.password )
        // Busca el usuario por cédula
        const user = await prisma.rAE_Funcionarios.findFirst({
          where: { Cedula: credentials.cedula },
        });

        if (!user) {
          throw new Error("No user found with the provided cedula");
        }

        // Compara la contraseña proporcionada con la almacenada
        console.log('La contraseña del usuario es: ', user.Password, '\nLa contraseña que viene en la credencial es: ', credentials.password);
        const isValidPassword = await compare(credentials.password, user.Password);
        console.log('el resultado de la comparacion es ', isValidPassword);
        if (!isValidPassword) {
          throw new Error("Incorrect password");
        }
        
        return {
          id: String(user.Id_funcionario),
          name: `${user.Primer_nombre} ${user.Primer_apellido}`,
          email: null, 
        };
      } 
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 15 * 60, // 30 days
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
});

export { handler as GET, handler as POST };