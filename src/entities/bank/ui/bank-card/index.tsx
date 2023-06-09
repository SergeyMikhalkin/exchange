import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Space, Typography } from 'antd';
import { Bank } from 'shared';
import PropTypes from 'prop-types';

const { Title, Text } = Typography;

const formatShedule = (shedule: Array<string>): Array<string> => {
  const formatedValue = shedule.map((dayString) => {
    let formatedString: string = dayString;
    const sheduleTimeParts = dayString.slice(2).trim().split(' '); // '10 30 19 00' => ['10', '30', '19', '00']
    if (sheduleTimeParts.length > 0) {
      const shortDayString = dayString.slice(0, 2);

      if (sheduleTimeParts.length === 4) {
        formatedString = `${shortDayString} ${sheduleTimeParts[0]}:${sheduleTimeParts[1]}-${sheduleTimeParts[2]}:${sheduleTimeParts[3]}`;
      }
      if (sheduleTimeParts.length === 8) {
        formatedString = `${shortDayString} ${sheduleTimeParts[0]}:${sheduleTimeParts[1]}-${sheduleTimeParts[2]}:${sheduleTimeParts[3]} ${sheduleTimeParts[4]}:${sheduleTimeParts[5]}-${sheduleTimeParts[6]}:${sheduleTimeParts[7]}`;
      }
      return formatedString;
    }
    return dayString;
  });

  return formatedValue;
};

type Props = {
  bank: Bank;
};

function BankCard(props: Props) {
  const { bank } = props;

  const title = `${bank.cityType} ${bank.cityName}`;
  const filial = bank.description;
  const address = `${bank.streetType} ${bank.streetName} ${bank.buildingNumber}`;

  const shedule = bank.weekShedule.split('|');

  const formatedShedule = formatShedule(shedule);

  const link = `/bank/${bank.filialId}`;

  return (
    <Card title={title} extra={<Link to={link}>More</Link>} style={{ width: 300, height: 400 }}>
      <Title level={5}>{filial}</Title>
      <Space direction="vertical">
        <Text>{address}</Text>
        {formatedShedule.map((day: string) => (
          <Text>{day}</Text>
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
  }).isRequired,
};
