import React, { useEffect } from 'react';
import { Row, Space, Typography, Table, List, Col } from 'antd';
import { formatShedule } from 'shared';
import { Link, useParams } from 'react-router-dom';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { toggleFavorite, resetState, getBanks, fetchAllBanks } from 'app/redux/banksSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'app/redux/store';
import { getUserAuth } from 'app/redux/authSlice';
import { columns, fillTableData } from 'pages/details/model/table';

const { Title } = Typography;

const emptyObj = {
  filialId: '',
  weekShedule: '',
  streetType: '',
  streetName: '',
  description: '',
  buildingNumber: '',
  cityName: '',
  cityType: '',
  favorite: false,
  usdIn: '0.0000',
  usdOut: '0.0000',
  eurIn: '0.0000',
  eurOut: '0.0000',
  rubIn: '0.0000',
  rubOut: '0.0000',
  gbrIn: '0.0000',
  gbrOut: '0.0000',
  cadIn: '0.0000',
  cadOut: '0.0000',
  plnIn: '0.0000',
  plnOut: '0.0000',
};

export function DetailsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();

  const bank =
    useSelector(getBanks).find((bankItem) => bankItem.filialId === id?.toString()) ?? emptyObj;

  useEffect(() => {
    dispatch(fetchAllBanks());
  }, [dispatch]);

  const shedule = bank ? bank.weekShedule.split('|') : new Array<string>();

  const userLogged = useSelector(getUserAuth);
  const onFavoriteClick = () => {
    if (userLogged) {
      dispatch(toggleFavorite({ filialId: id, searchString: bank.cityName }));
    }
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
      <Row justify="space-between" align="middle" style={{ margin: '20px 40px 0 20px' }}>
        <Title>
          <Link to="/" onClick={() => dispatch(resetState())}>
            &larr; На главную
          </Link>
        </Title>
        {bank.favorite ? (
          <HeartFilled
            style={{ visibility: userLogged ? 'visible' : 'hidden', fontSize: '32px' }}
            onClick={onFavoriteClick}
            key="favorite"
          />
        ) : (
          <HeartOutlined
            style={{ visibility: userLogged ? 'visible' : 'hidden', fontSize: '32px' }}
            onClick={onFavoriteClick}
            key="favorite"
          />
        )}
        <Title>{bank?.cityName}</Title>
      </Row>

      <Row align="top" justify="space-evenly">
        <Col>
          <Title level={4}>{bank?.description}</Title>
          <Title
            level={4}
          >{`${bank?.streetType} ${bank?.streetName} ${bank?.buildingNumber}`}</Title>
        </Col>
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
          <Table columns={columns} dataSource={fillTableData(bank)} rowKey="name" />
        </Col>
      </Row>
    </Space>
  );
}
