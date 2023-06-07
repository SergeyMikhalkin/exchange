import React from 'react';
import BankCard from 'entities/bank';
import { List } from 'antd';
import { Bank } from 'shared';
import PropTypes from 'prop-types';

type Props = {
  banks: Array<Bank>;
};

function BanksList(props: Props) {
  const { banks } = props;
  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 1,
        md: 2,
        lg: 3,
      }}
      dataSource={banks}
      renderItem={(bank) => (
        <List.Item>
          <BankCard bank={bank} />
        </List.Item>
      )}
    />
  );
}

export default BanksList;

BanksList.propTypes = {
  banks: PropTypes.arrayOf(
    PropTypes.shape({
      filialId: PropTypes.string,
      weekShedule: PropTypes.string,
      streetType: PropTypes.string,
      streetName: PropTypes.string,
      description: PropTypes.string,
      buildingNumber: PropTypes.string,
      cityName: PropTypes.string,
      cityType: PropTypes.string,
    })
  ).isRequired,
};
