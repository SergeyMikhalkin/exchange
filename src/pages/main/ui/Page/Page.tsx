import React from 'react';
import { Divider, Space, Spin } from 'antd';
import { useSelector } from 'react-redux';
import { getBanks, getStatus } from 'app/redux/banksSlice';
import BanksList from 'widgets/BanksList';
import { Statuses } from 'shared';
import { Header } from 'shared/ui';

export function MainPage() {
  const banks = useSelector(getBanks);
  const banksStatus = useSelector(getStatus);

  return (
    <>
      <Header />
      <Divider />
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
