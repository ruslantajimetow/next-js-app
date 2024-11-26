'use server';

import { LoginSchema } from '@/types/login-schema';
import { createSafeActionClient } from 'next-safe-action';
import { db } from '@/server';
import { eq } from 'drizzle-orm';
import { users } from '@/server/schema';
import { generateEmailVerificationToken } from './tokens';
import { sendVerification } from './email';
import { signIn } from '../auth';
import { AuthError } from 'next-auth';

const actionClient = createSafeActionClient();

export const emailSignIn = actionClient
  .schema(LoginSchema)
  .action(async ({ parsedInput: { email, password, code } }) => {
    try {
      const existingUser = await db.query.users.findFirst({
        where: eq(users.email, email),
      });

      if (existingUser?.email !== email) {
        return { error: 'User not found' };
      }

      if (!existingUser.emailVerified) {
        const verificationToken = await generateEmailVerificationToken(
          existingUser.email
        );
        await sendVerification(
          verificationToken[0].email,
          verificationToken[0].token
        );
        return { success: 'Confirm your email. Confirmation Email sent!' };
      }

      await signIn('credentials', {
        email,
        password,
        redirectTo: '/',
      });

      return { success: 'Logged in successfully' };
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return { error: 'Invalid email or password' };
          case 'AccessDenied':
            return { error: error.message };
        }
      }
      throw error;
    }
  });
