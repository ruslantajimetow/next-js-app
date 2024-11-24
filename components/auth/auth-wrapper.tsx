import { ReactNode } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Socials from '@/components/auth/socials';
import BackButton from '@/components/auth/back-button';

type AuthWrapperProps = {
  children: ReactNode;
  title: string;
  backButtonLable: string;
  backButtonHref: string;
  showSocials?: boolean;
};

export default function AuthWrapper({
  children,
  title,
  backButtonHref,
  backButtonLable,
  showSocials,
}: AuthWrapperProps) {
  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocials && (
        <CardFooter>
          <Socials />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton href={backButtonHref} lable={backButtonLable} />
      </CardFooter>
    </Card>
  );
}
