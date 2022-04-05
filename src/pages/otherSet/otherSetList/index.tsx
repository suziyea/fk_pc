import { PageContainer } from '@ant-design/pro-layout';
import {
  useState, useRef, useEffect,
} from 'react';
import {
  Card, Form, Space, Typography, Modal, notification,Tooltip
} from 'antd';
import moment from 'moment';

import HarTable from '@/components/HarTable';
import { actionRefHandle } from '@/components/HarTable/types';
import HandleProductForm from './component/HandleForm';
import {
    getOtherSetList,updateOtherSet
} from '@/services/api/other';

const { Link } = Typography;

const OtherSetList = () => {
  const actionRef = useRef<actionRefHandle>();
  const [otherSetForms] = Form.useForm();
  const [handleForm] = Form.useForm();

  const [otherSetListData, setOtherSetListData] = useState([]);
  const [accountId, setAccountId] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(false);

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
    title: '编码',
    dataIndex: 'code',
    key: 'code',
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
    title: '创建时间',
    dataIndex: 'created_at',
    key: 'created_at',
    render: (text: any) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
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
              ...record,
              created_at: moment(record?.created_at),
            });
            setAccountId(record.id);
            setIsVisible(true);
          }}>
          编辑
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
      created_at: moment(submitData?.created_at).format('YYYY-MM-DD HH:mm:ss')
    };
    try {
      if (accountId) {
        // await updateProduct(submitForm);
      } else {
        await updateOtherSet(submitForm)
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
          formRef={otherSetForms}
          filter={{
            initialValues: {
              
            },
            // operation: [{
            //   key: 12,
            //   type: 'primary',
            //   label: '新增产品',
            //   auth: 'addAccountBtn',
            //   onClick: () => {
            //     setAccountId('');
            //     resetHandleFields();
            //     setIsVisible(true);
            //   },
            // }],

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
          dataSource={otherSetListData}
          request={async (params) => {
            params.limit = params.pageSize;
            params.page = params.pageIndex;
            delete params.pageSize;
            delete params.pageIndex;
            setOtherSetListData([]);
            const res = await getOtherSetList({
              ...params,
              st: params.time?.[0] && moment(params.time[0]).format('YYYY-MM-DD 00:00:00'),
              et: params.time?.[1] && moment(params.time[1]).format('YYYY-MM-DD 23:59:59'),
            });
            setOtherSetListData(res?.list || []);
            return {
              total: +(res?.total_row) || 0,
            };
          }} />
      </Card>

      <Modal width={900} title={`${accountId ? '编辑' : '新增'}getOtherSetList`} visible={isVisible} onOk={addOrUpdateRole} onCancel={() => setIsVisible(false)}>
        <HandleProductForm form={handleForm} type={accountId ? 'edit' : 'add'} />
      </Modal>
    </PageContainer>
  );
};
export default OtherSetList;
