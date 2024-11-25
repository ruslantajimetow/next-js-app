'use server';

import { eq } from 'drizzle-orm';
import { db } from '..';
import { emailTokens } from '../schema';

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

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.delete(emailTokens).where(eq(emailTokens.id, existingToken.id));
  }

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
