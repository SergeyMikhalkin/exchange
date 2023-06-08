import { Form, Input } from 'antd';
import { fetchBanks } from 'app/redux/banksSlice';
import { AppDispatch } from 'app/redux/store';
import React, { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';

function Header() {
  const dispatch = useDispatch<AppDispatch>();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 3) {
      dispatch(fetchBanks(e.target.value));
    }
  };

  return (
    <Form
      name="searchform"
      layout="inline"
      initialValues={{
        searchString: '',
      }}
    >
      <Form.Item name="searchString" label="Search banks">
        <Input onChange={onChange} placeholder="Type city name here" />
      </Form.Item>
    </Form>
  );
}

export default Header;
