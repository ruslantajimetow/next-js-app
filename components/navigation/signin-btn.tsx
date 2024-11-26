'use client';

import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';
import Link from 'next/link';
import { LogIn } from 'lucide-react';

export default function SigninBtnn() {
  const currentPath = usePathname();
  console.log(currentPath);
  return (
    !currentPath.includes('auth') && (
      <Button variant="outline" asChild>
        <Link href="auth/login">
          <LogIn />
          <span>Sign In</span>
        </Link>
      </Button>
    )
  );
}
