'use server';

import { LoginSchema } from '@/types/login-schema';
import { createSafeActionClient } from 'next-safe-action';
import { db } from '@/server';
import { eq } from 'drizzle-orm';
import { users } from '@/server/schema';
import bcrypt from 'bcrypt';
import { generateEmailVerificationToken } from './tokens';
import { sendVerification } from './email';

const actionClient = createSafeActionClient();

export const emailSignUp = actionClient
  .schema(LoginSchema)
  .action(async ({ parsedInput: { userName, email, password, code } }) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existingUser) {
      if (!existingUser.emailVerified) {
        const verificationToken = await generateEmailVerificationToken(email);
        console.log(verificationToken);
        await sendVerification(
          verificationToken[0].email,
          verificationToken[0].token,
          'new-verification',
          'Confirm Email'
        );

        return { success: 'Email confirmation resent!' };
      }
      return { error: 'Email is already in use!' };
    }

    await db.insert(users).values({
      email,
      name: userName,
      password: hashedPassword,
    });

    const verificationToken = await generateEmailVerificationToken(email);
    await sendVerification(
      verificationToken[0].email,
      verificationToken[0].token,
      'new-verification',
      'Confirm Email'
    );

    return { success: 'Confirmation email sent!' };
  });
