import React from 'react';
import { SignUpForm } from 'features/auth/signUp';
import { LS_KEYS, LS_USER_INITIAL_STATE, SignUpFormData, useLocalStorageUsers } from 'shared';
import { Col, Row, Typography } from 'antd';

const { Title } = Typography;

export function SignUpPage() {
  const [users, setUserToLocalStorage] = useLocalStorageUsers();

  const onSubmit = (formData: SignUpFormData) => {
    const newUser = `${formData.userName}__${formData.password}`;
    if (users[LS_KEYS.users][newUser]) console.log('user already exist');
    else {
      const newUsersObj = {
        [LS_KEYS.users]: { ...users[LS_KEYS.users], [newUser]: LS_USER_INITIAL_STATE },
      };
      setUserToLocalStorage(newUsersObj);
    }
  };

  return (
    <Row justify="space-around" align="middle">
      <Col span={10}>
        <Title>Sign Up</Title>
        <SignUpForm onSubmit={onSubmit} />
      </Col>
    </Row>
  );
}
