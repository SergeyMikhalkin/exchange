import React, { useEffect } from 'react';
import { Space, Spin, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBanks, getBanks, getStatus } from 'app/redux/banksSlice';
import { AppDispatch } from 'app/redux/store';
import BanksList from 'widgets/BanksList';
import { Statuses } from 'shared';

const { Title } = Typography;

export function MainPage() {
  const dispatch = useDispatch<AppDispatch>();
  const banks = useSelector(getBanks);
  const banksStatus = useSelector(getStatus);

  useEffect(() => {
    if (banksStatus === Statuses.idle) {
      dispatch(fetchBanks());
    }
  }, [banksStatus, dispatch]);

  return (
    <>
      <Title>Banks</Title>
      {banksStatus === Statuses.loading ? (
        <Space size="large">
          <Spin size="large" />
        </Space>
      ) : (
        <BanksList banks={banks} />
      )}
    </>
  );
}
