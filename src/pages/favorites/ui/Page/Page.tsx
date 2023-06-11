import React from 'react';
import { Layout, Row, Space, Spin, Typography } from 'antd';
import { Bank, useCurrentUser, useFavorites } from 'shared';
import { useGetBanksQuery } from 'app/redux/apiSlice';
import BanksList from 'widgets/BanksList';
import { Link } from 'react-router-dom';

const { Title } = Typography;
const { Content } = Layout;

export function FavoritesPage() {
  const [currentUser] = useCurrentUser();
  const userFavorites = useFavorites(currentUser);

  const { data: dataFromApi, isLoading } = useGetBanksQuery();
  let favorites: Bank[] = [];

  if (dataFromApi && userFavorites) {
    favorites = dataFromApi.filter((favoriteFromApi) =>
      userFavorites.some((favoriteFromLS) => favoriteFromLS === favoriteFromApi.filialId)
    );
  }

  return (
    <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
      <Layout>
        <Row justify="space-around" align="middle">
          <Title>
            <Link to="/">&larr; На главную</Link>
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
            <BanksList banks={favorites} />
          )}
        </Content>
      </Layout>
    </Space>
  );
}
