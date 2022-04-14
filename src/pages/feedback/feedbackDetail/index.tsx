import { PageContainer } from '@ant-design/pro-layout';
import { useEffect, useState } from 'react';
import {
  Card,
  Descriptions,
  Divider,
} from 'antd';
import { useLocation, Location } from 'umi';
import moment from 'moment';
import DetailPageHeader from '@/components/DetailPageHeader';
import { getSessionStorage } from '@/utils/storage';
import styles from './style.less';

const DetailsFeedback = () => {
  const location = useLocation();
  const [feedbackDetails, setChannelDetails] = useState<any>({});
  const { query } = location as Location;

  useEffect(() => {
    if (query?.edit) {
      const storageObj = getSessionStorage('feedbackDetailsStorage');
      setChannelDetails({
        ...storageObj,
      });
    }
  }, []);

  return (
    <PageContainer
      title={(
        <DetailPageHeader
          headerName={`反馈详情`} />
      )}>
      <Card bordered={false}>
        <Descriptions title="反馈信息" style={{ marginBottom: 32 }}>
          <Descriptions.Item label="联系人">{feedbackDetails?.contact || '-'}</Descriptions.Item>
          <Descriptions.Item label="创建时间">{moment(feedbackDetails?.created_at || '-').format('YYYY-MM-DD HH:mm:ss')}</Descriptions.Item>
          <Descriptions.Item label="联系人电话">{feedbackDetails?.contact_phone || '-'}</Descriptions.Item>
          <Descriptions.Item label="联系人邮箱">{feedbackDetails?.contact_email}</Descriptions.Item>
        </Descriptions>
        <Divider style={{ marginBottom: 32 }} />
        <Descriptions title="当前用户信息" style={{ marginBottom: 32 }}>
          <Descriptions.Item label="登录用户名">{feedbackDetails?.user?.actual_name}</Descriptions.Item>
          <Descriptions.Item label="登录手机号">{feedbackDetails?.user?.phone}</Descriptions.Item>
        </Descriptions>
        <Divider style={{ marginBottom: 32 }} />
        <p className="ant-descriptions-title">反馈内容</p>
        <div title="描述" style={{ marginBottom: 32 }}>
          <p className={styles.detail}>
            {feedbackDetails?.content}
          </p>
        </div>
      </Card>
    </PageContainer>
  );
};
export default DetailsFeedback;
