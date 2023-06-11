import React from 'react';
import { Col, Row, Space, Typography } from 'antd';
import { useCurrentUser, useHistory } from 'shared';
import { Link } from 'react-router-dom';
import { resetState } from 'app/redux/banksSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'app/redux/store';

const { Title } = Typography;

export function HistoryPage() {
  const [currentUser] = useCurrentUser();
  const history = useHistory(currentUser);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Space direction="vertical" style={{ width: '100%' }} size={[0, 20]}>
      <Row justify="space-around" align="middle">
        <Title>
          <Link to="/" onClick={() => dispatch(resetState())}>
            &larr; На главную
          </Link>
        </Title>
        <Title>История поиска</Title>
      </Row>
      <Space direction="vertical" style={{ width: '100%' }} size={[0, 1]}>
        {history.map((historyItem) => (
          <Row key={historyItem.dateTime} justify="space-around" align="middle">
            <Col>
              <Link to={`/${historyItem.searchString}`}>
                <Title level={4}>{historyItem.searchString}</Title>
              </Link>
            </Col>
          </Row>
        ))}
      </Space>
    </Space>
  );
}
