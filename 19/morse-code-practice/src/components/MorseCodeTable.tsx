import React from 'react';
import { Table, Card, Row, Col } from 'antd';
import { MORSE_CODE_MAP } from '../utils/morseCode';

const MorseCodeTable: React.FC = () => {
  const lettersData = Object.entries(MORSE_CODE_MAP)
    .filter(([key]) => /^[A-Z]$/.test(key))
    .map(([char, code]) => ({ key: char, char, code }));

  const numbersData = Object.entries(MORSE_CODE_MAP)
    .filter(([key]) => /^[0-9]$/.test(key))
    .map(([char, code]) => ({ key: char, char, code }));

  const columns = [
    {
      title: '字符',
      dataIndex: 'char',
      key: 'char',
      width: '50%',
      align: 'center' as const,
    },
    {
      title: '摩尔斯电码',
      dataIndex: 'code',
      key: 'code',
      width: '50%',
      align: 'center' as const,
      render: (text: string) => (
        <span className="font-mono text-lg tracking-wider text-blue-600 dark:text-blue-400">
          {text}
        </span>
      ),
    },
  ];

  return (
    <Card title="摩尔斯电码对照表" className="w-full">
      <Row gutter={[24, 0]}>
        <Col xs={24} lg={12}>
          <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">
            字母 (A-Z)
          </h3>
          <Table
            columns={columns}
            dataSource={lettersData}
            pagination={false}
            size="small"
            scroll={{ y: 400 }}
          />
        </Col>
        <Col xs={24} lg={12}>
          <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">
            数字 (0-9)
          </h3>
          <Table
            columns={columns}
            dataSource={numbersData}
            pagination={false}
            size="small"
          />
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h4 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">
              说明
            </h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• <span className="font-mono">.</span> - 点 (短信号)</li>
              <li>• <span className="font-mono">-</span> - 划 (长信号)</li>
              <li>• 点和划之间有一个时间间隔</li>
              <li>• 字母之间有一个较长的时间间隔</li>
              <li>• 单词之间有一个更长的时间间隔</li>
            </ul>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default MorseCodeTable;
