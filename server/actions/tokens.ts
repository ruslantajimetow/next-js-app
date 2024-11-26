'use server';

import { eq } from 'drizzle-orm';
import { db } from '..';
import { emailTokens, users } from '../schema';

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = db.query.emailTokens.findFirst({
      where: eq(emailTokens.token, email),
    });
    return verificationToken;
  } catch (error) {
    console.log(error);
  }
};

export const generateEmailVerificationToken = async (email: string) => {
  const token = crypto.randomUUID();

  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const verificationToken = await db
    .insert(emailTokens)
    .values({
      email,
      token,
      expires,
    })
    .returning();

  return verificationToken;
};

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByEmail(token);

  if (!existingToken) return { error: 'Token not Found' };

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    await db.delete(emailTokens).where(eq(emailTokens.id, existingToken.id));
    return { error: 'Token has expired' };
  }

  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, existingToken.email),
  });

  if (!existingUser) return { error: 'Email does not exist' };

  await db.update(users).set({
    emailVerified: new Date(),
    email: existingToken.email,
  });

  await db.delete(emailTokens).where(eq(emailTokens.id, existingToken.id));

  return { success: 'Email Verified' };
};
