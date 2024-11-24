'use-client';

import Link from 'next/link';
import { Button } from '../ui/button';

type BackButtonProps = {
  href: string;
  lable: string;
};

export default function BackButton({ href, lable }: BackButtonProps) {
  return (
    <Button variant="link" className="font-medium w-full" asChild>
      <Link href={href}>{lable}</Link>
    </Button>
  );
}
