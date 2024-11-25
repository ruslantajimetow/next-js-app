'use server';

import getBaseUrl from '@/lib/base-url';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = getBaseUrl();

export const sendVerification = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  const { data, error } = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: email,
    subject: 'Next js App - Confirmation Email',
    html: `<p>Click to <a href=${confirmLink}>confirm your email</a></p>`,
  });

  if (error) {
    return console.log(error);
  }

  if (data) return data;
};
