import { PageContainer } from '@ant-design/pro-layout';
import { useEffect } from 'react';
import {
  Form,
  Card,
  Row,
  Col,
  Input,
  Button,
  notification,
} from 'antd';
import { useHistory, useLocation, Location } from 'umi';
import { validateEmoji, validateTrim } from '@/utils/validator';
import DetailPageHeader from '@/components/DetailPageHeader';
import InputLimited from '@/components/InputLimited';
// import UploadWithCrop from '@/components/UploadWithCrop';
import { getSessionStorage } from '@/utils/storage';

import { useLockFn } from '@/utils';

import {
  addChannel, updateChannel,
} from '@/services/api/content';

const { Item } = Form;
const { TextArea } = Input;

const AddChannel = () => {
  const history = useHistory();
  const location = useLocation();
  const { query } = location as Location;

  const [form] = Form.useForm();
  const { validateFields, setFieldsValue } = form;

  useEffect(() => {
    if (query?.edit) {
      const storageObj = getSessionStorage('channelStorage');
      setFieldsValue({
        ...storageObj,
      });
    }
  }, []);

  const submit = useLockFn(async () => {
    const submitData = await validateFields();
    console.log(submitData, '提交');
    if (query?.edit) {
      await updateChannel({
        ...submitData,
      });
    } else {
      await addChannel({
        ...submitData,
      });
    }
    notification.success({
      message: query?.edit ? '修改成功' : '新增成功',
    });
    history.push('channelList');
  });
  return (
    <PageContainer
      title={(
        <DetailPageHeader
          headerName={query?.edit ? `编辑渠道-${query?.name || query?.edit}` : '新增渠道'} />
      )}>
      <Form
        form={form}
        layout="vertical"
        autoComplete="off"
        initialValues={{
          type: 1,
          channelType: 0,
          stockModel: 2,
          isOutsideSearch: 1,
          buyThreshold: 0,
          isNumLimit: 0,
        }}>
        <Card className="card" title="基本信息">
          <Row gutter={24}>
            <Col span={12}>
              <Item
                label="渠道名"
                name="name"
                rules={[
                  { required: true, message: '请输入渠道名' },
                  {
                    validator: validateEmoji,
                  },
                  {
                    validator: validateTrim,
                  },
                ]}>
                <InputLimited
                  style={{ maxWidth: '400px' }}
                  placeholder="请输入渠道名"
                  limited={40} />
              </Item>

              <Item
                label="渠道编码"
                name="code"
                rules={[
                  { required: true, message: '请输入渠道编码' },
                  {
                    validator: validateEmoji,
                  },
                  {
                    validator: validateTrim,
                  },
                ]}>
                <InputLimited
                  style={{ maxWidth: '400px' }}
                  placeholder="请输入渠道编码"
                  limited={40} />
              </Item>

              <Item
                label="描述"
                name="remark"
                rules={[{ required: true, message: '请输入描述' }]}>
                <TextArea
                  placeholder="描述"
                  style={{ maxWidth: '500px' }}
                  rows={4}
                  showCount
                  maxLength={500} />
              </Item>
            </Col>
            {/* <Col span={12}>
              <Item label="logo" name="logo" rules={[{ required: true, message: '请上传logo' }]}>
                <UploadWithCrop width={80} height={80} />
              </Item>
            </Col> */}
          </Row>
          {query?.edit && (
            <>
              <Item name="id" label="id" hidden>
                <Input placeholder="input placeholder" />
              </Item>
            </>
          )}
        </Card>
        <Button type="primary" style={{ margin: '20px 0' }} onClick={submit}>
          确认提交
        </Button>
      </Form>
    </PageContainer>
  );
};
export default AddChannel;
