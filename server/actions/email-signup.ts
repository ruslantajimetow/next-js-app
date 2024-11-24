'use server';

import { LoginSchema } from '@/types/login-schema';
import { createSafeActionClient } from 'next-safe-action';
import { db } from '@/server';
import { eq } from 'drizzle-orm';
import { users } from '@/server/schema';

const actionClient = createSafeActionClient();

export const emailSignUp = actionClient
  .schema(LoginSchema)
  .action(async ({ parsedInput: { userName, email, password, code } }) => {
    console.log(userName, email, password);
    return { success: email };
  });
