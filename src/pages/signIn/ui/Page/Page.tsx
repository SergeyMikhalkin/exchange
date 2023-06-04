import React from 'react';
import { SignInForm } from 'features/auth/signIn';
import { User, useLocalStorage } from 'shared';
import { Typography } from 'antd';

const { Title } = Typography;

export function SignInPage() {
  const [users] = useLocalStorage();

  const onSubmit = (formData: User) => {
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
