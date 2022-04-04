import { PageContainer } from '@ant-design/pro-layout';
import {
  useState, useRef, useEffect,
} from 'react';
import {
  Card, Form, Badge, Space, Typography, Modal, notification, Tag,
} from 'antd';
import moment from 'moment';

import HarTable from '@/components/HarTable';
import { actionRefHandle } from '@/components/HarTable/types';
import RoleForm from './component/HandleForm';
import {
  getMemberList
} from '@/services/api/member';
import { updateImg, userEnabled } from '@/services/api/user';
import { selectOption, userStatusEnum } from '@/utils/enum';

const { Link } = Typography;
const { confirm } = Modal;

const ProductGroupList = () => {
  const actionRef = useRef<actionRefHandle>();
  const [roleForms] = Form.useForm();
  const [handleForm] = Form.useForm();

  const [userListData, setUserListData] = useState([]);
  const [accountId, setAccountId] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const { resetFields: resetHandleFields, validateFields: validateHandleFields } = handleForm;

  useEffect(() => {

  }, []);

  const columns = [{
    title: 'id',
    dataIndex: 'id',
    key: 'id',
    ellipsis: true,
  },
  {
    title: '用户名',
    dataIndex: 'actual_name',
    key: 'actual_name',
  }, {
    title: '手机',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    key: 'created_at',
    render: (text: any) => moment(text).format('YYYY-MM-DD HH:mm:ss'),

  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (text: number) => (
      <>
        {
          text === 1 && (
            <>
              <Badge status="default" />
              <span>已注册</span>
            </>
          )
        }
        {
          text === 2 && (
            <>
              <Badge status="success" />
              <span>已实名</span>
            </>
          )
        }
        {
          text === 3 && (
            <>
              <Badge status="processing" />
              <span>已停用</span>
            </>
          )
        }
      </>
    ),
  },
  {
    title: '上次登录时间',
    dataIndex: 'last_login',
    key: 'last_login',
    render: (text: any) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
  }, {
    title: '操作',
    key: 'operation',
    render: (_: any, record: any) => (
      <Space size="middle">
        <Link
          type={`${(record.enabled) ? 'danger' : 'success'}`}
          onClick={async () => {
            confirm(
              {
                content: `确认要${(record.enabled) ? '停' : '启'}用该会员吗？`,
                okText: '确认',
                okType: 'danger',
                cancelText: '取消',
                onOk: async () => {
                  await userEnabled({
                    id: [record.id],
                  });
                  notification.success({
                    message: `${(record.enabled) ? '停用' : '启用'}成功`,
                  });
                  actionRef.current?.reload();
                },
              },
            );
          }}>
          {(record.enabled) ? '停用' : '启用'}
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
        // await editAccount(submitForm);
      } else {
        await updateImg(submitForm)
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
            // operation: [{
            //   key: 1,
            //   type: 'primary',
            //   label: '新增会员',
            //   auth: 'addAccountBtn',
            //   onClick: () => {
            //     setAccountId('');
            //     resetHandleFields();
            //     handleForm.setFieldsValue({
            //       isDisabled: true,
            //     });
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
                key: 2,
                prop: 'channel_id',
                placeholder: '全部下单渠道',
                options: selectOption,
              }, {
                key: 3,
                prop: 'status',
                placeholder: '用户状态',
                options: userStatusEnum,
              }, {
                key: 4,
                prop: 'keyword',
                name: '手机号',
                placeholder: '请输入手机号',
              }],
          }}
          rowKey="email"
          columns={columns}
          dataSource={userListData}
          request={async (params) => {
            setUserListData([]);
            const res = await getMemberList({
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

      <Modal width={900} title={`${accountId ? '编辑' : '新增'}会员`} visible={isVisible} onOk={addOrUpdateRole} onCancel={() => setIsVisible(false)}>
        <RoleForm form={handleForm} type={accountId ? 'edit' : 'add'} />
      </Modal>
    </PageContainer>
  );
};
export default ProductGroupList;
