'use server';

import { NewPasswordSchema } from '@/types/new-password-schema';
import { createSafeActionClient } from 'next-safe-action';
import { getPasswordResetPasswordTokenByToken } from './tokens';
import { db } from '..';
import { eq } from 'drizzle-orm';
import { passwordResetTokens, users } from '../schema';
import bcrypt from 'bcrypt';
import { Pool } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';

const action = createSafeActionClient();

export const newPassword = action
  .schema(NewPasswordSchema)
  .action(async ({ parsedInput: { password, token } }) => {
    const pool = new Pool({ connectionString: process.env.DB_URL });
    const dbPool = drizzle(pool);
    console.log(token);

    // Check the token

    if (!token) return { error: 'Missing token' };

    // Need to check if the token is valid

    const existingToken = await getPasswordResetPasswordTokenByToken(token);

    if (!existingToken) return { error: 'Token not found' };

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) return { error: 'Token has expired' };

    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, existingToken.email),
    });

    if (!existingUser) return { error: 'user not found' };

    const hashedPassword = await bcrypt.hash(password, 10);

    await dbPool.transaction(async (tx) => {
      await tx
        .update(users)
        .set({
          password: hashedPassword,
        })
        .where(eq(users.id, existingUser.id));
      await tx
        .delete(passwordResetTokens)
        .where(eq(passwordResetTokens.id, existingToken.id));
    });

    return { success: 'Password updated!' };
  });
