import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { CheckCircleTwoTone, HeartTwoTone, SmileTwoTone } from '@ant-design/icons';
import { Card, Space } from 'antd';

const Welcome: React.FC = () => {
  return (
    <PageContainer>
      <Card>
      {/* welcome */}
      <Space>
        <SmileTwoTone />
        <HeartTwoTone twoToneColor="#eb2f96" />
        <CheckCircleTwoTone twoToneColor="#52c41a" />
      </Space>
      </Card>
    </PageContainer>
  );
};

export default Welcome;
