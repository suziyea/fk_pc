import {
  Form, Row, Col, FormInstance, Input, DatePicker,
} from 'antd';
import moment from 'moment';
import styles from './index.less';
import { validateEmoji, validateTrim } from '@/utils/validator';
import UploadWithCrop from '@/components/UploadWithCrop';

const { Item } = Form;

interface FormProps {
  form: FormInstance<any>,
  type: string;
}

const otherSetForm = ({ form, type }: FormProps) => {
  const datePickerChange = () => {
  };
  return (
    <Form
      form={form}
      layout="vertical"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      autoComplete="off">
      <Row gutter={12}>
        <Col span={12}>
          <Item
            noStyle
            shouldUpdate={(prevValues, currentValues) => prevValues.name !== currentValues.name}>
            {({ getFieldValue }) => (
              <Item
                name="remark"
                label="名称"
                rules={[{ required: true, message: '请输入名称' }, {
                  pattern: /^[^\s]*$/,
                  message: '禁止输入空格',
                }, {
                  validator: validateEmoji,
                }]}>
                <Input
                  placeholder="名称"
                  maxLength={20}
                  suffix={(
                    <span className={styles.suffix}>
                      {getFieldValue('remark')?.length || 0}
                      /20
                    </span>
                  )} />
              </Item>
            )}
          </Item>
          <Item
            label="编码"
            name="code"
            rules={[
              { required: true, message: '请输入编码' },
              {
                validator: validateEmoji,
              },
              {
                validator: validateTrim,
              },
            ]}>
            <Input disabled={type === 'edit'} placeholder="请输入编码" />
          </Item>

          <Item
            label="创建时间"
            name="created_at"
            rules={[{ required: true, message: '请输入创建时间' }]}>
            <DatePicker disabled={type === 'edit'} format="YYYY-MM-DD HH:mm:ss" showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }} onChange={datePickerChange} />
          </Item>
        </Col>
        <Col span={12}>
          <Item label="图片" name="image" rules={[{ required: true, message: '请上传图片' }]}>
            <UploadWithCrop width={327} height={137} />
          </Item>
        </Col>
      </Row>
      {
        type === 'edit'
        && (
          <>
            <Item
              name="id"
              label="id"
              hidden>
              <Input placeholder="input placeholder" />
            </Item>
          </>
        )

      }

    </Form>
  );
};

export default otherSetForm;
