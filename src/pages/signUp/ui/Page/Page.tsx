import React from 'react';
import { SignUpForm } from 'features/auth/signUp';
import { SignUpFormData, useLocalStorage } from 'shared';
import { Typography } from 'antd';

const { Title } = Typography;

export function SignUpPage() {
  const [, setUser] = useLocalStorage();

  const onSubmit = (formData: SignUpFormData) => {
    setUser(formData.userName + formData.password);
  };

  return (
    <>
      <Title>Sign Up</Title>
      <SignUpForm onSubmit={onSubmit} />
    </>
  );
}
