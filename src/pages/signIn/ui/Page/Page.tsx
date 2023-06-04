import React from 'react';
import { SignInForm } from 'features/auth/signIn';
import { SignInDataType, useLocalStorage } from 'shared';
import { Typography } from 'antd';

export function SignInPage() {
  const [users] = useLocalStorage();

  const onSubmit = (formData: SignInDataType) => {
    if (Object.prototype.hasOwnProperty.call(users, formData.userName + formData.password)) {
      console.log('welcome');
    }
  };

  const { Title } = Typography;

  return (
    <>
      <Title>Sign In</Title>
      <SignInForm onSubmit={onSubmit} />
    </>
  );
}
