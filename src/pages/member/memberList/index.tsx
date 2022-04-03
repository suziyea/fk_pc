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
import { updateImg } from '@/services/api/user';

const { Link } = Typography;

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
    title: '状态',
    dataIndex: 'isDisabled',
    key: 'isDisabled',
    render: (text: number) => (
      <>
        {!text ? (
          <>
            <Badge status="success" />
            已启用
          </>
        ) : (
          <>
            <Badge status="error" />
            已停用
          </>
        )}
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
            className="link-color"
            onClick={() => {
              handleForm.setFieldsValue({
                ...record,
                isDisabled: (!record?.isDisabled),
                roleIds: record.roles?.map((v: any) => (v.roleId)),
              });

              setAccountId(record.id);
              setIsVisible(true);
            }}>
            {/* userType === 1 是主账号，主账号不能修改 隐藏 */}
            {/* {record.userType === 2 && '编辑'} */}
            {'编辑'}
          </Link>
      </Space>
    ),
  }];

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
        message: accountId? '修改成功' : '新建成功',
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
            operation: [{
              key: 1,
              type: 'primary',
              label: '新增会员',
              auth: 'addAccountBtn',
              onClick: () => {
                setAccountId('');
                resetHandleFields();
                handleForm.setFieldsValue({
                  isDisabled: true,
                });
                setIsVisible(true);
              },
            }],
            filterItem: [{
              key: 1,
              prop: 'userName',
              name: '账号归属人',
              placeholder: '账号归属人',
            }],
          }}
          rowKey="email"
          columns={columns}
          dataSource={userListData}
          request={async (params) => {
            setUserListData([]);
            const res = await getMemberList({
              ...params,
            });
            console.log(params);
            setUserListData(res?.list || []);
            return {
              total: res?.recordsCount || 0,
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
