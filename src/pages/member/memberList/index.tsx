import { PageContainer } from '@ant-design/pro-layout';
import {
  useState, useRef, useEffect,
} from 'react';
import {
  Card, Form, Space, Typography, Modal, notification,
} from 'antd';
import moment from 'moment';
import { mapEnum } from '@/utils';

import HarTable from '@/components/HarTable';
import { actionRefHandle } from '@/components/HarTable/types';
import RoleForm from './component/HandleForm';
import {
  getMemberList,getChannelList
} from '@/services/api/member';
import { updateImg, userEnabled } from '@/services/api/user';
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
    getChannel()
  }, []);

  const getChannel = async () => {
    const list = await getChannelList({});
    setChannelList(
      list.map((v: any) => ({
          value: v.id,
          label: v.name,
        })),
    );
  };

  const columns = [{
    title: '手机',
    dataIndex: 'phone',
    key: 'phone',
    fixed: 'left',
  },
  {
    title: '姓名',
    dataIndex: 'actual_name',
    key: 'actual_name',
  }, 
  {
    title: '身份证号',
    dataIndex: 'id_number',
    key: 'id_number',
  },
  {
    title: '用户状态',
    dataIndex: 'status',
    key: 'status',
    render: (text: number) => (text ? mapEnum((text)+'', userStatusEnum) : ''),
  },
  {
    title: '渠道',
    dataIndex: 'channel',
    key: 'channel',
    render: (text: any,record:any) => {
      return (
        record?.channel ? (`${record?.channel?.name || ''} - ${record?.channel?.code || ''}`) : null
      )
    },
  },
  {
    title: '注册时间',
    dataIndex: 'created_at',
    key: 'created_at',
    render: (text: any) => {
      let date = new Date(text)
      let num = date.getTime()
      return text ? moment(num).format("YYYY-MM-DD HH:mm:ss") : ''
    },
  },
  {
    title: '上次登录时间',
    dataIndex: 'last_login',
    key: 'last_login',
    render: (text: any) =>  {
      let date = new Date(text)
      let num = date.getTime()
      return text ? moment(num).format("YYYY-MM-DD HH:mm:ss") : ''
    },
  },
  {
    title: '第一笔付费时间',
    dataIndex: 'first_pay_time',
    key: 'first_pay_time',
    render: (text: any) =>  {
      let date = new Date(text)
      let num = date.getTime()
      return text ? moment(num).format("YYYY-MM-DD HH:mm:ss") : ''
    },
  },
  {
    title: '第二笔付费时间',
    dataIndex: 'second_pay_time',
    key: 'second_pay_time',
    render: (text: any) =>  {
      let date = new Date(text)
      let num = date.getTime()
      return text ? moment(num).format("YYYY-MM-DD HH:mm:ss") : ''
    },
  },
  
  {
    title: '操作',
    key: 'operation',
    width: 120,
    fixed: 'right',
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
          scroll={{ x: 2600 }}
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
                placeholder: '渠道',
                options: channelList,
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
            params.limit = params.pageSize;
            params.page = params.pageIndex;
            delete params.pageSize;
            delete params.pageIndex;
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
