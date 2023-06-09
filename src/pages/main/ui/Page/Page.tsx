import React from 'react';
import { Spin, Layout, Space } from 'antd';
import { useSelector } from 'react-redux';
import { getBanks, getStatus } from 'app/redux/banksSlice';
import BanksList from 'widgets/BanksList';
import { Statuses } from 'shared';
import SearchForm from 'features/search';

const { Header, Content } = Layout;

export function MainPage() {
  const banks = useSelector(getBanks);
  const banksStatus = useSelector(getStatus);

  return (
    <div>
      <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
        <Layout>
          <Header
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#3ba0e9',
            }}
          >
            <SearchForm />
          </Header>
          <Content style={{ margin: '20px 0 20px 0' }}>
            {banksStatus === Statuses.loading ? (
              <Space
                direction="vertical"
                size={16}
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              >
                <Spin size="large" />
              </Space>
            ) : (
              <BanksList banks={banks} />
            )}
          </Content>
        </Layout>
      </Space>
    </div>
  );
}
