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
import { ResetSchema } from '@/types/reset-schema';
import { resetPassword } from '@/server/actions/password-reset';

export default function ResetForm() {
  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: '',
    },
  });

  const { execute, status } = useAction(resetPassword, {
    onSuccess(data) {
      if (data.data?.success) setSuccess(data.data.success);
      if (data.data?.error) setError(data.data.error);
    },
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    execute(values);
  };
  return (
    <AuthWrapper
      title="Enter your registered email"
      backButtonHref="/auth/login"
      backButtonLable="Back to login"
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
              Reset password
            </Button>
          </form>
        </Form>
      </div>
    </AuthWrapper>
  );
}
