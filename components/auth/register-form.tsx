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
import { useAction } from 'next-safe-action/hooks';
import { cn } from '@/lib/utils';
import { emailSignUp } from '@/server/actions/email-signup';

export default function RegisterForm() {
  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      userName: '',
      email: '',
      password: '',
    },
  });

  const { execute, status } = useAction(emailSignUp, {});

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    execute(values);
  };
  return (
    <AuthWrapper
      title="Create an account!"
      backButtonHref="/auth/login"
      backButtonLable="Already have an account?"
      showSocials
    >
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="userName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">User name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="John Doe"
                      type="text"
                      autoComplete="name"
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
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

            <Button
              className={cn(
                'w-full',
                status === 'executing' ? 'animate-pulse' : ''
              )}
              type="submit"
            >
              Register
            </Button>
          </form>
        </Form>
      </div>
    </AuthWrapper>
  );
}
