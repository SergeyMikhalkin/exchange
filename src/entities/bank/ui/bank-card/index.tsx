import React from 'react';
import { Link } from 'react-router-dom';
import { Card, List, Typography } from 'antd';
import { Bank } from 'shared';
import PropTypes from 'prop-types';

const { Title } = Typography;

type Props = {
  bank: Bank;
};

function BankCard(props: Props) {
  const { bank } = props;

  const title = `${bank.cityType} ${bank.cityName}`;
  const filial = bank.description;
  const address = `${bank.streetType}${bank.streetName} ${bank.buildingNumber}`;
  const shedule = bank.weekShedule.split('|');
  const link = `/bank/${bank.filialId}`;

  return (
    <Card title={title} extra={<Link to={link}>More</Link>} style={{ width: 350 }}>
      <Title level={4}>{filial}</Title>
      <Title level={5}>{address}</Title>
      <List
        size="small"
        bordered
        dataSource={shedule}
        renderItem={(day: string) => <List.Item>{day}</List.Item>}
      />
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
  }).isRequired,
};
