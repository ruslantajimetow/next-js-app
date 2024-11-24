'use client';

import AuthWrapper from './auth-wrapper';

export default function LoginForm() {
  return (
    <AuthWrapper
      title="Welcome Back"
      backButtonHref="/auth/register"
      backButtonLable="Create a new Account"
      showSocials
    >
      <div>Login</div>
    </AuthWrapper>
  );
}
