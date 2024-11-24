'use client';

import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import googleIcon from '@/public/google.png';
import githubIcon from '@/public/github.png';

export default function Socials() {
  return (
    <div className="w-full">
      <Button
        variant="outline"
        className="flex w-full items-center"
        onClick={() => signIn('google', { redirect: false, callbackUrl: '/' })}
      >
        <span>Sign in with Google</span>
        <Image src={googleIcon} alt="google" className="w-5" />
      </Button>
      <Button
        variant="outline"
        className="flex w-full items-center mt-1"
        onClick={() => signIn('github', { redirect: false, callbackUrl: '/' })}
      >
        <span>Sign in with Github</span>
        <Image src={githubIcon} alt="google" className="w-6" />
      </Button>
    </div>
  );
}
