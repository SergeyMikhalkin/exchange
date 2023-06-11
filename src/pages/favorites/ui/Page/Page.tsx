import React, { useEffect } from 'react';
import { Layout, Row, Space, Spin, Typography } from 'antd';
import { useGetBanksQuery } from 'app/redux/apiSlice';
import BanksList from 'widgets/BanksList';
import { Link } from 'react-router-dom';
import { fillDataFromRTKQuery, getFavoriteBanks, resetState } from 'app/redux/banksSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'app/redux/store';

const { Title } = Typography;
const { Content } = Layout;

export function FavoritesPage() {
  const dispatch = useDispatch<AppDispatch>();
  const banks = useSelector(getFavoriteBanks);

  const { data: dataFromApi, isLoading, isSuccess } = useGetBanksQuery();

  useEffect(() => {
    dispatch(fillDataFromRTKQuery(dataFromApi));
  }, [isSuccess, dataFromApi, dispatch]);

  return (
    <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
      <Layout>
        <Row justify="space-around" align="middle">
          <Title>
            <Link to="/" onClick={() => dispatch(resetState())}>
              &larr; На главную
            </Link>
          </Title>
          <Title>Избраное</Title>
        </Row>
        <Content style={{ margin: '20px 0 20px 0' }}>
          {isLoading ? (
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
  );
}
