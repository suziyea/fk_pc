import { PageContainer } from '@ant-design/pro-layout';
import {
  useState, useRef, useEffect,
} from 'react';
import {
  Card, Form, Typography,
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
    title: '序号',
    dataIndex: 'id',
    key: 'id',
    width: 80
  },
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Link',
    dataIndex: 'link',
    key: 'link',
  },
  {
    title: '注册时间',
    dataIndex: 'created_at',
    key: 'created_at',
    width: 200,
    render: (text: any) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
  }];
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
            params.limit = params.pageSize;
            params.page = params.pageIndex;
            delete params.pageSize;
            delete params.pageIndex;
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
