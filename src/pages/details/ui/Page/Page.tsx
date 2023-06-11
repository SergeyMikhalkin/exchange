import React, { useEffect } from 'react';
import { Layout, Row, Space, Spin, Typography, Table, List, Col } from 'antd';
import { FavoriteToggle, formatShedule, useCurrentUser, useFavorites } from 'shared';
import { useGetBanksFullDetailsQuery } from 'app/redux/apiSlice';
import { Link, useParams } from 'react-router-dom';
import { columns, fillTableData } from 'pages/details/model/table';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { toggleFavorite } from 'app/redux/banksSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'app/redux/store';

const { Title } = Typography;
const { Content } = Layout;

export function DetailsPage() {
  const [currentUser] = useCurrentUser();
  const userFavorites = useFavorites(currentUser);
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();

  useEffect(() => {}, []);

  let favorite: boolean = false;
  const { data: dataFromApi, isLoading } = useGetBanksFullDetailsQuery();
  const bank = dataFromApi?.find((bankItem) => bankItem.filialId === id)!;
  const bankToggleInfo: FavoriteToggle = {
    filialId: bank?.filialId ?? '',
    searchString: bank?.cityName ?? '',
  };

  const shedule = bank ? bank.weekShedule.split('|') : new Array<string>();

  if (userFavorites) {
    favorite = userFavorites.some((favoriteFromLS) => favoriteFromLS === bank?.filialId);
  }

  return (
    <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
      <Layout>
        <Row justify="space-around" align="middle">
          <Title>
            <Link to="/">&larr; На главную</Link>
          </Title>
          {favorite ? (
            <HeartFilled onClick={() => dispatch(toggleFavorite(bankToggleInfo))} />
          ) : (
            <HeartOutlined onClick={() => dispatch(toggleFavorite(bankToggleInfo))} />
          )}
          <Title>{bank?.cityName}</Title>
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
            <Space direction="vertical" style={{ width: '100%' }} size={[0, 25]}>
              <Row justify="space-around" align="middle">
                <Row justify="start" align="middle">
                  <Title level={4}>{bank?.description}</Title>
                </Row>
                <Row justify="start" align="middle">
                  <Title
                    level={4}
                  >{`${bank?.streetType} ${bank?.streetName} ${bank?.buildingNumber}`}</Title>
                </Row>
              </Row>
              <Row justify="space-around" align="stretch">
                <Col>
                  <Title level={4}>Время работы</Title>
                  <List
                    size="small"
                    bordered
                    dataSource={formatShedule(shedule)}
                    renderItem={(item) => <List.Item key={item}>{item}</List.Item>}
                  />
                </Col>
                <Col>
                  <Title level={4}>Курсы валют</Title>
                  <Table columns={columns} dataSource={fillTableData(bank)} />
                </Col>
              </Row>
            </Space>
          )}
        </Content>
      </Layout>
    </Space>
  );
}
