import * as z from 'zod';

export const LoginSchema = z.object({
  userName: z.optional(z.string().min(3, { message: 'User name is required' })),
  email: z.string().email({
    message: 'Invalid email address',
  }),
  password: z.string().min(1, {
    message: 'Password is required',
  }),
  code: z.optional(z.string()),
});
