import { Form, Input } from 'antd';
import { fetchBanks } from 'app/redux/banksSlice';
import { AppDispatch } from 'app/redux/store';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useThrottle } from 'shared';

function SearchForm() {
  const dispatch = useDispatch<AppDispatch>();
  const [searchString, setSearchString] = useState('');
  const throttledValue = useThrottle(searchString);

  useEffect(() => {
    if (throttledValue) {
      dispatch(fetchBanks(throttledValue));
    }
  }, [throttledValue, dispatch]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 3) {
      setSearchString(e.target.value);
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

export default SearchForm;
