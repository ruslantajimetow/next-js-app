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
import { z } from 'zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useAction } from 'next-safe-action/hooks';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { FormSuccess } from './form-success';
import { FormError } from './form-error';
import { NewPasswordSchema } from '@/types/new-password-schema';
import { newPassword } from '@/server/actions/new-password';
import { useSearchParams } from 'next/navigation';

export default function NewPasswordForm() {
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: '',
    },
  });

  const { execute, status } = useAction(newPassword, {
    onSuccess(data) {
      if (data.data?.success) setSuccess(data.data.success);
      if (data.data?.error) setError(data.data.error);
    },
  });

  const params = useSearchParams();
  const token = params.get('token');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    execute({ ...values, token });
  };
  return (
    <AuthWrapper
      title="Enter new password"
      backButtonHref="/auth/login"
      backButtonLable="Back to login"
    >
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">New password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="new password"
                      type="password"
                      autoComplete="email"
                      disabled={status === 'executing'}
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormSuccess message={success} />
            <FormError message={error} />
            <Button
              className={cn(
                'w-full',
                status === 'executing' ? 'animate-pulse' : ''
              )}
              type="submit"
            >
              Change password
            </Button>
          </form>
        </Form>
      </div>
    </AuthWrapper>
  );
}
