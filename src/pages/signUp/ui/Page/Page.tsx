import React from 'react';
import { SignUpForm } from 'features/auth/signUp';
import { SignUpDataType, useLocalStorage } from 'shared';
import { Typography } from 'antd';

export function SignUpPage() {
  const [, setUser] = useLocalStorage();

  const onSubmit = (formData: SignUpDataType) => {
    setUser(formData.userName + formData.password);
  };

  const { Title } = Typography;

  return (
    <>
      <Title>Sign Up</Title>
      <SignUpForm onSubmit={onSubmit} />
    </>
  );
}
