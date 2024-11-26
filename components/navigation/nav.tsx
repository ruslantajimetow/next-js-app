import { auth } from '@/server/auth';
import UserButton from './user-button';
import Link from 'next/link';
import { Button } from '../ui/button';
import { LogIn } from 'lucide-react';
import Image from 'next/image';

import logo from '@/public/logo_next.png';
import SigninBtnn from './signin-btn';

export default async function Nav() {
  const session = await auth();
  console.log(session);
  return (
    <header className="py-4">
      <nav>
        <ul className="flex justify-between items-center ">
          <li>
            <Link href="/">
              <Image src={logo} alt="logo" className="w-16 rounded-full" />
            </Link>
          </li>
          <li>
            {session && (
              <UserButton user={session?.user} expires={session?.expires} />
            )}

            {!session && <SigninBtnn />}
          </li>
        </ul>
      </nav>
    </header>
  );
}
