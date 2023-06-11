import React, { useState } from 'react';
import { SignUpForm } from 'features/auth/signUp';
import { LS_KEYS, LS_USER_INITIAL_STATE, SignUpFormData, useLocalStorageUsers, wait } from 'shared';
import { Col, Row, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const { Title } = Typography;

export function SignUpPage() {
  const [users, setUserToLocalStorage] = useLocalStorageUsers();
  const [userAlreadyExsistError, setUserAlreadyExsistError] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (formData: SignUpFormData) => {
    const newUser = `${formData.userName}__${formData.password}`;

    if (users[LS_KEYS.users][newUser]) setUserAlreadyExsistError(true);
    else {
      setUserAlreadyExsistError(false);
      const newUsersObj = {
        [LS_KEYS.users]: { ...users[LS_KEYS.users], [newUser]: LS_USER_INITIAL_STATE },
      };
      setUserToLocalStorage(newUsersObj);
      await wait(500);
      navigate('/signin');
    }
  };

  return (
    <>
      <Row justify="center">
        <Title>
          <Link to="/">&larr; На главную</Link>
        </Title>
      </Row>
      <Row justify="space-around" align="middle">
        <Col span={10}>
          <Title>Регистрация</Title>
          <SignUpForm onSubmit={onSubmit} userAlreadyExsistError={userAlreadyExsistError} />
        </Col>
      </Row>
    </>
  );
}
