import {
  Form, Row, Col, FormInstance,   Radio , Input, Select,
} from 'antd';
import {
  useEffect, useState,
} from 'react';
import styles from './index.less';
import UploadWithCrop from '@/components/UploadWithCrop';

import { validateEmoji } from '@/utils/validator';
import { imgUploadEnum} from '@/utils/enum';

const { Item } = Form;
const { Option } = Select;
const { TextArea } = Input;

interface FormProps {
  form: FormInstance<any>,
  type: string

}

const RoleForm = ({ form, type }: FormProps) => {
  const [roleListData, setRoleListData] = useState<any>([]);

  useEffect(() => {
  }, [type]);

  // 获取角色列表
  
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
                label="图片类型"
                name="code"
                rules={[{ required: true, message: '请选择图片类型' }]}>
                <Radio.Group>
                  {imgUploadEnum.map((v) => (
                    <Radio key={v.value} value={v.value}>
                      {v.label}
                    </Radio>
                  ))}
                </Radio.Group>
              </Item>
              <Item label="描述" name="remark">
                <TextArea
                  placeholder="描述"
                  style={{ maxWidth: '500px' }}
                  rows={4}
                  showCount
                  maxLength={20} />
              </Item>
        </Col>
        <Col span={12}>
              <Item label="活动小图" name="image" rules={[{ required: true, message: '请上传活动小图' }]}>
                <UploadWithCrop width={80} height={80} />
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
          <Item
            name="name"
            label="name"
            hidden>
            <Input placeholder="input placeholder" />
          </Item>
          <Item
            name="comment"
            label="comment"
            hidden>
            <Input placeholder="input placeholder" />
          </Item>
          <Item
            name="userType"
            label="userType"
            hidden>
            <Input placeholder="input placeholder" />
          </Item>
        </>
        )

      }

    </Form>
  );
};

export default RoleForm;
