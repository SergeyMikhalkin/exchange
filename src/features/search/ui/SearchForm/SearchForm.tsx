import { Form, Input } from 'antd';
import { fetchBanks, getStatus, toggleFavorites } from 'app/redux/banksSlice';
import { AppDispatch } from 'app/redux/store';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Statuses, useCurrentUser, useFavorites, useThrottle } from 'shared';

function SearchForm() {
  const dispatch = useDispatch<AppDispatch>();
  const { search } = useParams();
  const [searchString, setSearchString] = useState(search ?? '');
  const throttledValue = useThrottle(searchString);
  const banksStatus = useSelector(getStatus);
  const [currentUser] = useCurrentUser();
  const favorites = useFavorites(currentUser);

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
