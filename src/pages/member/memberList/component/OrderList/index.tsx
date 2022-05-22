import {
  useState, useEffect,
} from 'react';
import {
  Tooltip,Table,Pagination
} from 'antd';
import moment from 'moment';
import { orderTypeOption,payStatusOption } from '@/utils/enum';
import { mapEnum } from '@/utils';
import {
    getOrderlList
} from '@/services/api/member';
import styles from './index.less';

const OrderList = ({userId}:any) => {
  const [orderListData, setOrderListData] = useState([]);
  const [pageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [recordsCount, setRecordsCount] = useState<number>();

  useEffect(() => {
    getInitData()
  }, [userId,currentPage]);

  const getInitData = async () => {
    const res = await getOrderlList({
      user_id:userId,
      page:currentPage,
      limit: pageSize
    });
    if (res.length > 0 ) {
      setOrderListData(res);
      const pageTotal = Math.ceil(res?.length / pageSize);
      console.log(pageTotal, res?.length, pageSize);
      setRecordsCount(pageTotal * pageSize || 0);
      return;
    }
    setOrderListData([]);
  }

  const columns = [
  {
    title: '付款类型',
    dataIndex: 'order_type',
    key: 'order_type',
    render: (text: number) => (text ? `${mapEnum((text)+'', orderTypeOption)}付款` : ''),
  }, 
  {
    title: '订单号',
    dataIndex: 'order_no',
    width: 320,
    key: 'order_no',
  },
  {
    title: '订单状态',
    dataIndex: 'is_paid',
    key: 'is_paid',
    render: (text: number) => (text ? mapEnum(('' + text)+'', payStatusOption) : ''),
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    key: 'created_at',
    width: 220,
    render: (text: any) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
  },
  {
    title: '支付时间',
    dataIndex: 'pay_time',
    key: 'pay_time',
    width: 220,
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
   // 分页
   const onChangePage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
      <div className={styles.container_table}>
          <Table scroll={{ x: 1400 }} rowKey="id" pagination={false} columns={columns} dataSource={orderListData} />
          <div className={styles.pagination}>
                <Pagination total={recordsCount} onChange={(page: number) => onChangePage(page)} />
            </div>
      </div>
  );
};
export default OrderList;
