import React from 'react';
import BankCard from 'entities/bank';
import { Col, Row, Space } from 'antd';
import { Bank } from 'shared';
import PropTypes from 'prop-types';

type Props = {
  banks: Array<Bank>;
};

function BanksList(props: Props) {
  const { banks } = props;

  const rows: Array<Array<Bank>> = [];

  for (let i = 0; i < banks.length; i += 3) {
    const newRow: Array<Bank> = [];
    for (let j = 0; j < 3; j += 1) {
      if (i + j < banks.length) newRow.push(banks[i + j]);
    }
    rows.push(newRow);
  }

  return (
    <Space direction="vertical" size={16} style={{ display: 'flex' }}>
      {rows.map((row) => (
        <Row justify="center" gutter={16} key={JSON.stringify(row)}>
          {row.map((item) => (
            <Col span={6} key={item.filialId}>
              <BankCard bank={item} />
            </Col>
          ))}
        </Row>
      ))}
    </Space>
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
