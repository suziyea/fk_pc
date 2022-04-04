import { PageContainer } from '@ant-design/pro-layout';
import { useEffect, useState } from 'react';
import {
  Card,
  Descriptions,
  Divider,
  Avatar,
} from 'antd';
import { useLocation, Location } from 'umi';
import moment from 'moment';
import DetailPageHeader from '@/components/DetailPageHeader';
import { getSessionStorage } from '@/utils/storage';

const DetailsChannel = () => {
  const location = useLocation();
  const [channelDetails, setChannelDetails] = useState<any>({});
  const { query } = location as Location;

  useEffect(() => {
    if (query?.edit) {
      const storageObj = getSessionStorage('channelDetailsStorage');
      setChannelDetails({
        ...storageObj,
      });
    }
  }, []);

  return (
    <PageContainer
      title={(
        <DetailPageHeader
          headerName={`${query?.name || query?.edit}-渠道详情`} />
      )}>
      <Card bordered={false}>
        <Descriptions title="用户信息" style={{ marginBottom: 32 }}>
          <Descriptions.Item label="名称">{channelDetails?.name || '-'}</Descriptions.Item>
          <Descriptions.Item label="注册时间">{moment(channelDetails?.created_at || '-').format('YYYY-MM-DD HH:mm:ss')}</Descriptions.Item>
          <Descriptions.Item label="付款转化率">{channelDetails?.pay_convert_percent || '-'}</Descriptions.Item>
          <Descriptions.Item label="认证资料">{channelDetails?.band_card_user_count}</Descriptions.Item>
        </Descriptions>
        <Divider style={{ marginBottom: 32 }} />
        <Descriptions title="渠道信息" style={{ marginBottom: 32 }}>
          <Descriptions.Item label="渠道UV">{channelDetails?.number_visit}</Descriptions.Item>
          <Descriptions.Item label="注册量">{channelDetails?.register_user_count}</Descriptions.Item>
          <Descriptions.Item label="签约">{channelDetails?.verified_user_count}</Descriptions.Item>
          <Descriptions.Item label="登录">暂不明确</Descriptions.Item>
          <Descriptions.Item label="订单数">{channelDetails?.initiate_debit}</Descriptions.Item>
          <Descriptions.Item label="未输入验证码">{channelDetails?.first_no_verification_code_user_count}</Descriptions.Item>
          <Descriptions.Item label="付款数">{channelDetails?.first_pay_count}</Descriptions.Item>
          <Descriptions.Item label="付款金额">{channelDetails?.first_pay_amount}</Descriptions.Item>
          <Descriptions.Item label="二次付款人数">{channelDetails?.second_pay_count}</Descriptions.Item>
          <Descriptions.Item label="二次付款金额">{channelDetails?.second_pay_amount}</Descriptions.Item>
          <Descriptions.Item label="Link">{channelDetails?.link}</Descriptions.Item>
        </Descriptions>
        <Divider style={{ marginBottom: 32 }} />
        <p className="ant-descriptions-title">logo</p>
        <div title="logo" style={{ marginBottom: 32 }}>
          <Avatar size={90} src={channelDetails?.logo} />
        </div>
        <Divider style={{ marginBottom: 32 }} />
        <p className="ant-descriptions-title">描述</p>
        <div title="描述" style={{ marginBottom: 32 }}>
          <p className="ant-descriptions-item-label">
            {channelDetails?.remark}
          </p>
        </div>
      </Card>
    </PageContainer>
  );
};
export default DetailsChannel;
