import React, { useState } from 'react';
import { SignInForm } from 'features/auth/signIn';
import { LS_KEYS, SignInFormData, useCurrentUser, useLocalStorageUsers, wait } from 'shared';
import { Col, Row, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuth } from 'app/redux/authSlice';
import { AppDispatch } from 'app/redux/store';

const { Title } = Typography;

export function SignInPage() {
  const [, setCurrentUser] = useCurrentUser();
  const [users] = useLocalStorageUsers();
  const [mismatchPasswordError, setMismatchPasswordError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async (formData: SignInFormData) => {
    const userName = `${formData.userName}__${formData.password}`;

    if (users[LS_KEYS.users] && users[LS_KEYS.users][userName]) {
      setCurrentUser(userName);
      dispatch(setAuth(userName));
      await wait(500);
      navigate('/');
    } else setMismatchPasswordError(true);
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
          <Title>Вход</Title>
          <SignInForm onSubmit={onSubmit} mismatchPasswordError={mismatchPasswordError} />
        </Col>
      </Row>
    </>
  );
}
