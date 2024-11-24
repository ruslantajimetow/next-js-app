import { auth } from '@/server/auth';
import UserButton from './user-button';
import Link from 'next/link';
import { Button } from '../ui/button';
import { LogIn } from 'lucide-react';

export default async function Nav() {
  const session = await auth();

  return (
    <header className="h-20 px-8">
      <nav className="h-full">
        <ul className="flex justify-between items-center h-full">
          <li>Logo</li>
          {session ? (
            <UserButton user={session?.user} expires={session?.expires} />
          ) : (
            <Button variant="outline" asChild>
              <Link href="auth/login">
                <LogIn />
                <span>Sign In</span>
              </Link>
            </Button>
          )}
        </ul>
      </nav>
    </header>
  );
}
