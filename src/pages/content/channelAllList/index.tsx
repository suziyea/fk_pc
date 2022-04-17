import { PageContainer } from '@ant-design/pro-layout';
import {
  useState, useRef, useEffect,
} from 'react';
import {
  Card, Form,Tooltip
} from 'antd';
import moment from 'moment';

import HarTable from '@/components/HarTable';
import { actionRefHandle } from '@/components/HarTable/types';
import {
  getChannelTotalList,
} from '@/services/api/content';
// import { setSessionStorage, removeSessionStorage } from '@/utils/storage';

// const { Link } = Typography;

const ChannelList = () => {

  const actionRef = useRef<actionRefHandle>();
  const [channelForms] = Form.useForm();
  const [channelTotalAllListData, setChannelTotalAllListData] = useState([]);
  useEffect(() => {

  }, []);

  const columns = [{
    title: '渠道',
    dataIndex: 'code',
    key: 'code',
    width: 60,
    ellipsis: {
        showTitle: false,
      },
      render: (code:any) => (
        <Tooltip placement="topLeft" title={code}>
          {code}
        </Tooltip>
      ),
  },
  {
    title: '日期',
    dataIndex: 'date',
    key: 'date',
    width: 70,
  },
  {
    title: '付款转化率',
    dataIndex: 'pay_convert_percent',
    key: 'pay_convert_percent',
    align: 'center',
    width: 60,
  }, {
    title: 'UV',
    dataIndex: 'uv',
    width: 40,
    key: 'uv',
  },
  {
    title: '注册量',
    dataIndex: 'new_register_user_count',
    key: 'new_register_user_count',
    width: 60,
  },
  {
    title: '用户登录数',
    dataIndex: 'new_login_user_count',
    key: 'new_login_user_count',
    align: 'center',
    width: 60,
  },
  {
    title: '实名数',
    dataIndex: 'verified_user_count',
    key: 'verified_user_count',
    width: 60,
  },
  {
    title: '签约',
    dataIndex: 'band_card_user_count',
    key: 'band_card_user_count',
    width: 60,
  },
  {
    title: '订单数',
    dataIndex: 'order_count',
    key: 'order_count',
    width: 60,
  },
  {
    title: '未验证码数',
    dataIndex: 'first_no_verification_code_user_count',
    align: 'center',
    key: 'first_no_verification_code_user_count',
    width: 100,
  },
  {
    title: '付款数',
    dataIndex: 'first_pay_count',
    key: 'first_pay_count',
    width: 60,
  },
  {
    title: '付费金额',
    dataIndex: 'first_pay_amount',
    key: 'first_pay_amount',
    width: 70,
  },
  {
    title: '二次付款数',
    dataIndex: 'second_pay_count',
    key: 'second_pay_count',
    align: 'center',
    width: 80,
  },
  {
    title: '二次付费金额',
    dataIndex: 'second_pay_amount',
    key: 'second_pay_amount',
    align: 'center',
    width: 92,
  },
];
  const disabledDate = (current: any) => (current && current > moment().endOf('day'));

  return (
    <PageContainer>
      <Card>
        <HarTable
          actionRef={actionRef}
          formRef={channelForms}
          filter={{
            initialValues: {
              
            },
            filterItem: [
              {
                key: 2,
                type: 'dateRange',
                prop: 'time',
                disabledDate,
              }],
          }}
          rowKey="email"
          columns={columns}
          dataSource={channelTotalAllListData}
          request={async (params) => {
            params.limit = params.pageSize;
            params.page = params.pageIndex;
            delete params.pageSize;
            delete params.pageIndex;
            setChannelTotalAllListData([]);
            const res = await getChannelTotalList({
              ...params,
              st: params.time?.[0] && moment(params.time[0]).format('YYYY-MM-DD 00:00:00'),
              et: params.time?.[1] && moment(params.time[1]).format('YYYY-MM-DD 23:59:59'),
            });
            setChannelTotalAllListData(res?.list || []);
            return {
              total: +(res?.total_row) || 0,
            };
          }} />
      </Card>

    </PageContainer>
  );
};
export default ChannelList;
