import { PageContainer } from '@ant-design/pro-layout';
import {
  useState, useRef, useEffect,
} from 'react';
import {
  Card, Form, Badge, Space, Typography, Modal, notification,Tooltip
} from 'antd';
import moment from 'moment';

import HarTable from '@/components/HarTable';
import { actionRefHandle } from '@/components/HarTable/types';
import HandleProductForm from './component/HandleForm';
import {
    getProdctList,updateProduct,addProduct,delProduct
} from '@/services/api/product';
import { userStatusEnum } from '@/utils/enum';

const { Link } = Typography;
const { confirm } = Modal;

const ProductGroupList = () => {
  const actionRef = useRef<actionRefHandle>();
  const [roleForms] = Form.useForm();
  const [handleForm] = Form.useForm();

  const [userListData, setUserListData] = useState([]);
  const [accountId, setAccountId] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [channelList, setChannelList] = useState([]);

  const { resetFields: resetHandleFields, validateFields: validateHandleFields } = handleForm;

  useEffect(() => {
  }, []);



  const columns = [{
    title: 'id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  }, 
  {
    title: '金额',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: '周期',
    dataIndex: 'term',
    key: 'term',
  },
  {
    title: '最快周期',
    dataIndex: 'fastest_term',
    key: 'fastest_term',
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
  {
    title: '操作',
    key: 'operation',
    render: (_: any, record: any) => (
      <Space size="middle">
        <Link
          className="link-color"
          onClick={ () => {
            resetHandleFields();
            handleForm.setFieldsValue({
              ...record
            });
            setAccountId(record.id);
            setIsVisible(true);
          }}>
          编辑
        </Link>
        <Link
          className="link-color"
          onClick={async () => {
            confirm(
              {
                content: `确认要删除用该产品吗？`,
                okText: '确认',
                okType: 'danger',
                cancelText: '取消',
                onOk: async () => {
                  await delProduct({
                    id: [record.id],
                  });
                  notification.success({
                    message: `删除成功`,
                  });
                  actionRef.current?.reload();
                },
              },
            );
          }}>
          删除
        </Link>
      </Space>
    ),
  }];
  const disabledDate = (current: any) => (current && current > moment().endOf('day'));

  // 弹框确定
  const addOrUpdateRole = async () => {
    const submitData = await validateHandleFields();
    const submitForm = {
      ...submitData,
    };
    try {
      if (accountId) {
        await updateProduct(submitForm);
      } else {
        await addProduct(submitForm)
      }

      notification.success({
        message: accountId ? '修改成功' : '新建成功',
      });
      setIsVisible(false);
      resetHandleFields();
    } catch (error) {
      console.log(error);
    }
    actionRef.current?.reload();
  };

  return (
    <PageContainer>
      <Card>
        <HarTable
          actionRef={actionRef}
          formRef={roleForms}
          filter={{
            initialValues: {
              selectkey: {
                key: 'mobile',
              },
            },
            operation: [{
              key: 12,
              type: 'primary',
              label: '新增产品',
              auth: 'addAccountBtn',
              onClick: () => {
                setAccountId('');
                resetHandleFields();
                setIsVisible(true);
              },
            }],

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
          rowKey="email"
          columns={columns}
          dataSource={userListData}
          request={async (params) => {
            params.limit = params.pageSize;
            params.page = params.pageIndex;
            delete params.pageSize;
            delete params.pageIndex;
            setUserListData([]);
            const res = await getProdctList({
              ...params,
              st: params.time?.[0] && moment(params.time[0]).format('YYYY-MM-DD 00:00:00'),
              et: params.time?.[1] && moment(params.time[1]).format('YYYY-MM-DD 23:59:59'),
            });
            setUserListData(res?.list || []);
            return {
              total: +(res?.total_row) || 0,
            };
          }} />
      </Card>

      <Modal width={900} title={`${accountId ? '编辑' : '新增'}产品`} visible={isVisible} onOk={addOrUpdateRole} onCancel={() => setIsVisible(false)}>
        <HandleProductForm form={handleForm} type={accountId ? 'edit' : 'add'} />
      </Modal>
    </PageContainer>
  );
};
export default ProductGroupList;
