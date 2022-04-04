import { PageContainer } from '@ant-design/pro-layout';
import {
  useState, useRef, useEffect,
} from 'react';
import {
  Card, Form, Space, Typography,
} from 'antd';
import { useHistory } from 'umi';

import moment from 'moment';

import HarTable from '@/components/HarTable';
import { actionRefHandle } from '@/components/HarTable/types';
import {
  getChannelList,
} from '@/services/api/content';
import { setSessionStorage, removeSessionStorage } from '@/utils/storage';

const { Link } = Typography;

const ChannelList = () => {
  const history = useHistory();

  const actionRef = useRef<actionRefHandle>();
  const [channelForms] = Form.useForm();
  const [channelListData, setChannelListData] = useState([]);
  useEffect(() => {

  }, []);

  const columns = [{
    title: 'id',
    dataIndex: 'id',
    key: 'id',
    ellipsis: true,
    fixed: 'left',
  },
  {
    title: '菜单图标',
    dataIndex: 'logo',
    key: 'logo',
    fixed: 'left',
    render: (text: string) => <img style={{ width: '36px' }} src={text} alt="icon" />,
  },
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
  },
  {
    title: '注册时间',
    dataIndex: 'created_at',
    key: 'created_at',
    width: 220,
    render: (text: any) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
  },
  {
    title: '付款转化率',
    dataIndex: 'pay_convert_percent',
    key: 'pay_convert_percent',
  }, {
    title: '渠道UV',
    dataIndex: 'number_visit',
    key: 'number_visit',
  },
  {
    title: '注册量',
    dataIndex: 'register_user_count',
    key: 'register_user_count',
  },
  {
    title: '登录',
    dataIndex: 'number_visit',
    key: 'number_visit',
    render: (text: any) => '暂无',
  },
  {
    title: '资料认证',
    dataIndex: 'band_card_user_count',
    key: 'band_card_user_count',
  },
  {
    title: '签约',
    dataIndex: 'verified_user_count',
    key: 'verified_user_count',
  },
  {
    title: '订单数',
    dataIndex: 'initiate_debit',
    key: 'initiate_debit',
  },
  {
    title: '未输入验证码',
    dataIndex: 'first_no_verification_code_user_count',
    key: 'first_no_verification_code_user_count',
    width: 220,
  },
  {
    title: '付款数',
    dataIndex: 'first_pay_count',
    key: 'first_pay_count',
  },
  {
    title: '付费金额',
    dataIndex: 'first_pay_amount',
    key: 'first_pay_amount',
  },
  {
    title: '二次付款人数',
    dataIndex: 'second_pay_count',
    key: 'second_pay_count',
  },
  {
    title: '二次付费金额',
    dataIndex: 'second_pay_amount',
    key: 'second_pay_amount',
  },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    render: (_: any, record: any) => (
      <Space size="middle">
        <Link
          className="link-color"
          onClick={() => {
            removeSessionStorage('channelStorage');
            setSessionStorage('channelStorage', record);
            history.push(`addChannel?edit=${record.id || ''}&name=${record.name}`);
          }}>
          编辑
        </Link>
      </Space>
    ),
  }];
  const disabledDate = (current: any) => (current && current > moment().endOf('day'));

  return (
    <PageContainer>
      <Card>
        <HarTable
          actionRef={actionRef}
          formRef={channelForms}
          scroll={{ x: 2600 }}
          filter={{
            initialValues: {
              selectkey: {
                key: 'mobile',
              },
            },
            operation: [{
              key: 1,
              type: 'primary',
              label: '新增渠道',
              auth: 'addAccountBtn',
              onClick: () => {
                history.push('addChannel');
              },
            }],

            filterItem: [
              {
                key: 2,
                type: 'dateRange',
                prop: 'time',
                disabledDate,
              },
              {
                key: 3,
                prop: 'keyword',
                name: '渠道号',
                placeholder: '请输入渠道号',
              }],
          }}
          rowKey="email"
          columns={columns}
          dataSource={channelListData}
          request={async (params) => {
            setChannelListData([]);
            const res = await getChannelList({
              ...params,
              st: params.time?.[0] && moment(params.time[0]).format('YYYY-MM-DD 00:00:00'),
              et: params.time?.[1] && moment(params.time[1]).format('YYYY-MM-DD 23:59:59'),
            });
            setChannelListData(res?.list || []);
            return {
              total: +(res?.total_row) || 0,
            };
          }} />
      </Card>

    </PageContainer>
  );
};
export default ChannelList;
