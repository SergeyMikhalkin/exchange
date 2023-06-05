import React from 'react';
import { SignInForm } from 'features/auth/signIn';
import { SignInFormData, useLocalStorage } from 'shared';
import { Typography } from 'antd';

const { Title } = Typography;

export function SignInPage() {
  const [users] = useLocalStorage();

  const onSubmit = (formData: SignInFormData) => {
    if (users[formData.userName + formData.password]) {
      console.log('welcome');
    }
  };

  return (
    <>
      <Title>Sign In</Title>
      <SignInForm onSubmit={onSubmit} />
    </>
  );
}
