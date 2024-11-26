'use client';

import { newVerification } from '@/server/actions/tokens';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import AuthWrapper from './auth-wrapper';
import { FormSuccess } from './form-success';
import { FormError } from './form-error';

export const EmailVerificationForm = () => {
  const token = useSearchParams().get('token');
  const router = useRouter();

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleVerification = useCallback(() => {
    if (success || error) return;

    if (!token) setError('Token not found');

    if (token) {
      newVerification(token).then((data) => {
        if (data.error) {
          setError(data.error);
          return;
        }
        if (data.success) {
          setSuccess(data.success);
          router.push('/auth/login');
          return;
        }
      });
    }
  }, []);

  useEffect(() => {
    handleVerification();
  }, []);

  return (
    <AuthWrapper
      backButtonHref="auth/login"
      backButtonLable="Back to Login"
      title="Email Varification..."
    >
      <div>
        <p>{!success && !error ? 'Verifying email' : ''}</p>
        <FormSuccess message={success} />
        <FormError message={error} />
      </div>
    </AuthWrapper>
  );
};
