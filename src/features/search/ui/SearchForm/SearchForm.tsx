import { BankOutlined } from '@ant-design/icons';
import { Button, Form, Input, Typography } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { getUserAuth, setAuth } from 'app/redux/authSlice';
import { fetchBanks, getStatus, toggleFavorites } from 'app/redux/banksSlice';
import { AppDispatch } from 'app/redux/store';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Statuses, useCurrentUser, useFavorites, useThrottle } from 'shared';

const { Text } = Typography;

function SearchForm() {
  const dispatch = useDispatch<AppDispatch>();
  const { search } = useParams();
  const [searchString, setSearchString] = useState(search ?? '');
  const throttledValue = useThrottle(searchString);
  const banksStatus = useSelector(getStatus);
  const [currentUser, setCurrentUser] = useCurrentUser();
  const favorites = useFavorites(currentUser);
  const isAuth = useSelector(getUserAuth);

  useEffect(() => {
    if (throttledValue) {
      dispatch(fetchBanks(throttledValue));
    }
  }, [throttledValue, dispatch]);

  useEffect(() => {
    if (banksStatus === Statuses.succeeded) {
      dispatch(toggleFavorites(favorites));
    }
  }, [banksStatus, dispatch, favorites]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 3) {
      setSearchString(e.target.value);
    }
  };

  const onSignOut = () => {
    dispatch(setAuth(''));
    setCurrentUser('');
  };

  return (
    <Form
      name="searchform"
      layout="inline"
      initialValues={{
        searchString: search ?? '',
      }}
    >
      <FormItem>
        <BankOutlined style={{ fontSize: '32px' }} />
      </FormItem>
      <Form.Item name="searchString" label="Найти в городе: ">
        <Input onChange={onChange} placeholder="Тут название города" />
      </Form.Item>
      {isAuth ? (
        <>
          <Form.Item>
            <Link to="/favorites">
              <Button type="primary">Избранное</Button>
            </Link>
          </Form.Item>
          <Form.Item>
            <Link to="/history">
              <Button type="primary">История</Button>
            </Link>
          </Form.Item>
          <Form.Item>
            <Text>{isAuth}</Text>
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={onSignOut}>
              Sign out
            </Button>
          </Form.Item>
        </>
      ) : (
        <>
          <Form.Item>
            <Link to="/signup">
              <Button type="primary">Sign Up</Button>
            </Link>
          </Form.Item>
          <Form.Item>
            <Link to="/signin">
              <Button type="primary">Sign In</Button>
            </Link>
          </Form.Item>
        </>
      )}
    </Form>
  );
}

export default SearchForm;
