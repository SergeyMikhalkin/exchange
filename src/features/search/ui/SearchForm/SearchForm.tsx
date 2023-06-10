import { Form, Input } from 'antd';
import { fetchBanks } from 'app/redux/banksSlice';
import { AppDispatch } from 'app/redux/store';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useThrottle } from 'shared';

function SearchForm() {
  const dispatch = useDispatch<AppDispatch>();
  const { search } = useParams();
  const [searchString, setSearchString] = useState(search ?? '');
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
        searchString: search ?? '',
      }}
    >
      <Form.Item name="searchString" label="Search banks in: ">
        <Input onChange={onChange} placeholder="Type city name here" />
      </Form.Item>
    </Form>
  );
}

export default SearchForm;
