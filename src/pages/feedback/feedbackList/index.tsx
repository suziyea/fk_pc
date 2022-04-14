import { PageContainer } from '@ant-design/pro-layout';
import {
  useState, useRef, useEffect,
} from 'react';
import {
  Card, Form, Space, Typography
} from 'antd';
import moment from 'moment';
import { useHistory } from 'umi';

import HarTable from '@/components/HarTable';
import { actionRefHandle } from '@/components/HarTable/types';
import { setSessionStorage, removeSessionStorage } from '@/utils/storage';

import {
    getFeedback
} from '@/services/api/other';

const { Link } = Typography;

const feedbackList = () => {
  const actionRef = useRef<actionRefHandle>();
  const [roleForms] = Form.useForm();
  const history = useHistory();

  const [feedbackListData, setFeedbackListData] = useState([]);

  useEffect(() => {
  }, []);

  const columns = [{
    title: 'id',
    dataIndex: 'id',
    key: 'id',
    width: 60,
  },
  {
    title: '联系人',
    dataIndex: 'contact',
    key: 'contact',
  },
  {
    title: '联系人电话',
    dataIndex: 'contact_phone',
    key: 'contact_phone',
  },
  {
    title: '联系人邮箱',
    dataIndex: 'contact_email',
    key: 'contact_email',
  },
  {
    title: '登录手机号',
    dataIndex: 'user',
    key: 'user',
    render: (text: any) => text?.phone
  },
  {
    title: '登录用户名',
    dataIndex: 'user',
    key: 'user',
    width: 130,
    render: (text: any) => text?.actual_name,
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    key: 'created_at',
    width: 180,
    render: (text: any) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
  },
  {
    title: '操作',
    key: 'operation',
    width: 80,
    render: (_: any, record: any) => (
      <Space size="middle">
        <Link
          className="link-color"
          onClick={() => {
            removeSessionStorage('feedbackDetailsStorage');
            setSessionStorage('feedbackDetailsStorage', record);
            history.push(`feedbackDetail?edit=${record.id || ''}`);
          }}>
          详情
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
          formRef={roleForms}
          filter={{
            initialValues: {
              
            },
            filterItem: [
              {
                key: 1,
                type: 'dateRange',
                prop: 'time',
                disabledDate,
              }, {
                key: 4,
                prop: 'keyword',
                name: '查询',
                placeholder: '请输入查询内容',
              }],
          }}
          rowKey="id"
          columns={columns}
          dataSource={feedbackListData}
          request={async (params) => {
            params.limit = params.pageSize;
            params.page = params.pageIndex;
            delete params.pageSize;
            delete params.pageIndex;
            setFeedbackListData([]);
            const res = await getFeedback({
              ...params,
              st: params.time?.[0] && moment(params.time[0]).format('YYYY-MM-DD 00:00:00'),
              et: params.time?.[1] && moment(params.time[1]).format('YYYY-MM-DD 23:59:59'),
            });
            setFeedbackListData(res?.list || []);
            return {
              total: +(res?.total_row) || 0,
            };
          }} />
      </Card>
    </PageContainer>
  );
};
export default feedbackList;
