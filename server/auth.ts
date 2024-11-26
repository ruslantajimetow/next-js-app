import NextAuth from 'next-auth';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '@/server';
import Google from 'next-auth/providers/google';
import GitHub from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';
import { LoginSchema } from '@/types/login-schema';
import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import { users } from './schema';
import { ZodError } from 'zod';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  session: { strategy: 'jwt' },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (
        credentials: Partial<Record<'email' | 'password', unknown>>
      ) => {
        try {
          const validatedFields = LoginSchema.safeParse(credentials);
          console.log(validatedFields.data);

          if (validatedFields.success) {
            const { email, password } = validatedFields.data;

            const user = await db.query.users.findFirst({
              where: eq(users.email, email),
            });

            if (!user || !user.password) return null;

            const pwMatch = await bcrypt.compare(password, user.password);

            if (pwMatch) return user;
          }
          return null;
        } catch (error) {
          if (error instanceof ZodError) {
            return { error: error.message };
          }
        }
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
});
