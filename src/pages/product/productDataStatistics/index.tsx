import { PageContainer } from '@ant-design/pro-layout';
import {
  useState, useRef, useEffect,
} from 'react';
import {
  Card, Form,
} from 'antd';
import moment from 'moment';

import HarTable from '@/components/HarTable';
import { actionRefHandle } from '@/components/HarTable/types';
import {
    getProductDataStatistics,
} from '@/services/api/product';

interface LimitedProps {
  /**
   * @description 总数
   */
   count: number;
  /**
   * @description 日期
   */
  date?: string;

  name?: string;
  id?: string | number
}
const ProductGroupList = () => {
  const actionRef = useRef<actionRefHandle>();
  const [tableForms] = Form.useForm();
  const [tableListData, setTableListData] = useState([]);


  useEffect(() => {
  }, []);



  const columns = [
  {
    title: '产品名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '日期',
    dataIndex: 'date',
    key: 'date',
    render: (text: any) => moment(text).format('YYYY-MM-DD'),
  },
  {
    title: '点击量',
    dataIndex: 'count',
    key: 'count',
  },
 ];
  const disabledDate = (current: any) => (current && current > moment().endOf('day'));


  return (
    <PageContainer>
      <Card >
        <HarTable
          actionRef={actionRef}
          formRef={tableForms}
          filter={{
            filterItem: [
              {
                key: 1,
                type: 'dateRange',
                prop: 'time',
                disabledDate,
              }],
          }}
          rowKey="id"
          columns={columns}
          dataSource={tableListData}
          request={async (params) => {
            params.limit = params.pageSize;
            params.page = params.pageIndex;
            delete params.pageSize;
            delete params.pageIndex;
            setTableListData([]);
            const res = await getProductDataStatistics({
              ...params,
              st: params.time?.[0] && moment(params.time[0]).format('YYYY-MM-DD 00:00:00'),
              et: params.time?.[1] && moment(params.time[1]).format('YYYY-MM-DD 23:59:59'),
            });
            const data = res?.list?.map((item: LimitedProps,i:number) => {
              item.id = i
              return item;
            })
            setTableListData(data || []);
            return {
              total: +(res?.total_row) || 0,
            };
          }} />
      </Card>
    </PageContainer>
  );
};
export default ProductGroupList;
