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

  const title = `${bank.name_type} ${bank.name}`;
  const filial = bank.filials_text;
  const address = `${bank.street_type}${bank.street} ${bank.home_number}`;
  const shedule = bank.info_worktime.split('|');
  const link = `/bank/${bank.filial_id}`;

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
    filial_id: PropTypes.string,
    sap_id: PropTypes.string,
    info_worktime: PropTypes.string,
    street_type: PropTypes.string,
    street: PropTypes.string,
    filials_text: PropTypes.string,
    home_number: PropTypes.string,
    name: PropTypes.string,
    name_type: PropTypes.string,
  }).isRequired,
};
