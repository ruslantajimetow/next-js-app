'use server';
import { ResetSchema } from '@/types/reset-schema';
import { createSafeActionClient } from 'next-safe-action';
import { db } from '..';
import { eq } from 'drizzle-orm';
import { users } from '../schema';
import { generatePasswordResetToken } from './tokens';
import { sendVerification } from './email';

const action = createSafeActionClient();
export const resetPassword = action
  .schema(ResetSchema)
  .action(async ({ parsedInput: { email } }) => {
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!existingUser) return { error: 'Email nout found' };

    const passwordResetToken = await generatePasswordResetToken(email);

    if (!passwordResetToken) return { error: 'Missing token' };

    await sendVerification(
      passwordResetToken[0].email,
      passwordResetToken[0].token,
      'new-password',
      'Reset password'
    );

    return { success: 'Reset Email sent!' };
  });
