'use client';

import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import AuthWrapper from './auth-wrapper';
import { LoginSchema } from '@/types/login-schema';
import { z } from 'zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';
import { emailSignIn } from '@/server/actions/email-signin';
import { useAction } from 'next-safe-action/hooks';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { FormSuccess } from './form-success';
import { FormError } from './form-error';

export default function LoginForm() {
  console.log(Math.random() > 0.5);
  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { execute, status } = useAction(emailSignIn, {
    onSuccess(data) {
      if (data.data?.success) setSuccess(data.data.success);
      if (data.data?.error) setError(data.data.error);
    },
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    execute(values);
  };
  return (
    <AuthWrapper
      title="Welcome Back"
      backButtonHref="/auth/register"
      backButtonLable="Create a new Account"
      showSocials
    >
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="example@gmail.com"
                      type="email"
                      autoComplete="email"
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Password</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="password" type="password" />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormSuccess message={success} />
            <FormError message={error} />

            <Button size={'sm'} variant={'link'}>
              <Link href="auth/reset">Forgot your password?</Link>
            </Button>
            <Button
              className={cn(
                'w-full',
                status === 'executing' ? 'animate-pulse' : ''
              )}
              type="submit"
            >
              Login
            </Button>
          </form>
        </Form>
      </div>
    </AuthWrapper>
  );
}
