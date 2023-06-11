import { ColumnsType } from 'antd/es/table';
import { Bank } from 'shared';

export type TableData = {
  name: string;
  sell: string;
  buy: string;
};

export const columns: ColumnsType<TableData> = [
  {
    title: 'Пара',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Продажа',
    dataIndex: 'sell',
    key: 'sell',
  },
  {
    title: 'Покупка',
    dataIndex: 'buy',
    key: 'buy',
  },
];

export const fillTableData = (bank: Bank) => {
  const data: TableData[] = [
    {
      name: 'USD',
      sell: bank.usdIn ?? '0.0000',
      buy: bank.usdOut ?? '0.0000',
    },
    {
      name: 'EUR',
      sell: bank.eurIn ?? '0.0000',
      buy: bank.eurOut ?? '0.0000',
    },
    {
      name: 'RUB',
      sell: bank.rubIn ?? '0.0000',
      buy: bank.rubOut ?? '0.0000',
    },
    {
      name: 'GBR',
      sell: bank.gbrIn ?? '0.0000',
      buy: bank.gbrOut ?? '0.0000',
    },
    {
      name: 'CAD',
      sell: bank.cadIn ?? '0.0000',
      buy: bank.cadOut ?? '0.0000',
    },
    {
      name: 'PLN',
      sell: bank.plnIn ?? '0.0000',
      buy: bank.plnOut ?? '0.0000',
    },
  ];

  return data;
};
