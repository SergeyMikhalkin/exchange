import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Divider, Row, Space, Typography } from 'antd';
import { Bank, formatShedule } from 'shared';
import PropTypes from 'prop-types';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'app/redux/store';
import { toggleFavorite } from 'app/redux/banksSlice';
import { getUserAuth } from 'app/redux/authSlice';

const { Text } = Typography;

type Props = {
  bank: Bank;
};

function BankCard(props: Props) {
  const { bank } = props;

  const dispatch = useDispatch<AppDispatch>();
  const userLogged = useSelector(getUserAuth);

  const title = `${bank.cityType} ${bank.cityName}`;
  const filial = bank.description;
  const address = `${bank.streetType} ${bank.streetName} ${bank.buildingNumber}`;

  const shedule = bank.weekShedule.split('|');

  const formatedShedule = formatShedule(shedule);

  const link = `/bank/${bank.filialId}`;

  const bankInfo = { filialId: bank.filialId, searchString: bank.cityName };

  const onFavoriteClick = () => {
    if (userLogged) {
      dispatch(toggleFavorite(bankInfo));
    }
  };

  return (
    <Card
      title={title}
      bodyStyle={{ height: 370, overflow: 'hidden' }}
      extra={<Link to={link}>More</Link>}
      actions={[
        bank.favorite ? (
          <HeartFilled
            style={{ visibility: userLogged ? 'visible' : 'hidden' }}
            onClick={onFavoriteClick}
            key="favorite"
          />
        ) : (
          <HeartOutlined
            style={{ visibility: userLogged ? 'visible' : 'hidden' }}
            onClick={onFavoriteClick}
            key="favorite"
          />
        ),
      ]}
    >
      <Space direction="vertical">
        <Text strong>{filial}</Text>
        <Divider />
        <Row justify="start" align="middle">
          <Text>{address}</Text>
        </Row>
        {formatedShedule.map((day: string) => (
          <Row justify="start" align="middle" key={day}>
            <Text key={day}>{day}</Text>
          </Row>
        ))}
      </Space>
    </Card>
  );
}

export default BankCard;

BankCard.propTypes = {
  bank: PropTypes.shape({
    filialId: PropTypes.string,
    weekShedule: PropTypes.string,
    streetType: PropTypes.string,
    streetName: PropTypes.string,
    description: PropTypes.string,
    buildingNumber: PropTypes.string,
    cityName: PropTypes.string,
    cityType: PropTypes.string,
    favorite: PropTypes.bool,
  }).isRequired,
};
