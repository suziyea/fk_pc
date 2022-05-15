import { PageContainer } from '@ant-design/pro-layout';
import {
  useState, useRef, useEffect,
} from 'react';
import {
  Card, Form,Tooltip
} from 'antd';
import moment from 'moment';
import { orderTypeOption,payStatusOption } from '@/utils/enum';
import { mapEnum } from '@/utils';

import HarTable from '@/components/HarTable';
import { actionRefHandle } from '@/components/HarTable/types';
import {
    getOrderlList
} from '@/services/api/member';

const OrderList = () => {
  const actionRef = useRef<actionRefHandle>();
  const [otherSetForms] = Form.useForm();
  const [orderListData, setOrderListData] = useState([]);
  useEffect(() => {
  }, []);

  const columns = [{
    title: 'id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '付款类型',
    dataIndex: 'order_type',
    key: 'order_type',
    render: (text: number) => (text ? mapEnum((text)+'', orderTypeOption) : ''),
  }, 
  {
    title: '订单号',
    dataIndex: 'order_no',
    key: 'order_no',
  },
  {
    title: '订单状态',
    dataIndex: 'order_no',
    key: 'order_no',
    render: (text: number) => (text ? mapEnum((text)+'', payStatusOption) : ''),
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    key: 'created_at',
    render: (text: any) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
  },
  {
    title: '支付时间',
    dataIndex: 'pay_time',
    key: 'pay_time',
    render: (text: any) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
  },
  {
    title: '支付金额',
    dataIndex: 'order_amount',
    key: 'order_amount',
    render: (text: any) => text ? `¥ ${text}` : 0,
  },
  {
    title: '备注',
    dataIndex: 'remark',
    key: 'remark',
    width: 180,
    ellipsis: true,
    render: (text: string) => (
      <Tooltip title={text}>
        <span>{text}</span>
      </Tooltip>
    ),
  },
  
  ];

  return (
    <PageContainer>
      <Card>
        <HarTable
          actionRef={actionRef}
          formRef={otherSetForms}
          filter={{
            initialValues: {
              
            },
            filterItem: [
              {
                key: 1,
                prop: 'keyword',
                name: '查询',
                placeholder: '请输入查询订单',
              }],
          }}
          rowKey="id"
          columns={columns}
          dataSource={orderListData}
          request={async (params) => {
            params.limit = params.pageSize;
            params.page = params.pageIndex;
            delete params.pageSize;
            delete params.pageIndex;
            setOrderListData([]);
            const res = await getOrderlList({
              ...params,
            });
            setOrderListData(res?.list || []);
            return {
              total: +(res?.total_row) || 0,
            };
          }} />
      </Card>
    </PageContainer>
  );
};
export default OrderList;
