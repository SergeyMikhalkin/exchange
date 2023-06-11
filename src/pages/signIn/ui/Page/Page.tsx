import React from 'react';
import { SignInForm } from 'features/auth/signIn';
import { LS_KEYS, SignInFormData, useCurrentUser, useLocalStorageUsers } from 'shared';
import { Col, Row, Typography } from 'antd';

const { Title } = Typography;

export function SignInPage() {
  const [, setCurrentUser] = useCurrentUser();
  const [users] = useLocalStorageUsers();

  const onSubmit = (formData: SignInFormData) => {
    const userName = `${formData.userName}__${formData.password}`;
    if (users[LS_KEYS.users] && users[LS_KEYS.users][userName]) {
      console.log('welcome');
      setCurrentUser(userName);
    } else console.log('user doesnt exist');
  };

  return (
    <Row justify="space-around" align="middle">
      <Col span={10}>
        <Title>Sign In</Title>
        <SignInForm onSubmit={onSubmit} />
      </Col>
    </Row>
  );
}
