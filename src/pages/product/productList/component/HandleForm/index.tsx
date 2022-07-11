import {
    Form, Row, Col, FormInstance, Input
  } from 'antd';
  import styles from './index.less';
  import { validateEmoji, validateTrim } from '@/utils/validator';
  import UploadWithCrop from '@/components/UploadWithCrop';
  import InputLimited from '@/components/InputLimited';
  
  const { Item } = Form;
  const { TextArea } = Input;
  
  interface FormProps {
    form: FormInstance<any>,
    type: string;
  }
  
  const ProductForm = ({ form, type }: FormProps) => {
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
                  name="name"
                  label="产品名称"
                  rules={[{ required: true, message: '请输入产品名称' }, {
                    pattern: /^[^\s]*$/,
                    message: '禁止输入空格',
                  }, {
                    validator: validateEmoji,
                  }]}>
                  <Input
                    placeholder="产品名称"
                    maxLength={20}
                    suffix={(
                      <span className={styles.suffix}>
                        {getFieldValue('name')?.length || 0}
                        /20
                      </span>
                    )} />
                </Item>
              )}
            </Item>
  
            <Item
              label="金额"
              name="amount"
              rules={[
                { required: true, message: '请输入金额' },
                {
                  validator: validateEmoji,
                },
                {
                  validator: validateTrim,
                },
              ]}>
              <InputLimited
                style={{ maxWidth: '400px' }}
                placeholder="请输入金额"
                limited={20} />
            </Item>
  
            {/* <Item
              label="周期"
              name="term"
              rules={[
                { required: true, message: '请输入周期' },
                {
                  validator: validateEmoji,
                },
                {
                  validator: validateTrim,
                },
              ]}>
              <InputLimited
                style={{ maxWidth: '400px' }}
                placeholder="请输入周期"
                limited={40} />
            </Item>
  
            <Item
              label="最快周期"
              name="fastest_term"
              rules={[
                { required: true, message: '请输入最快周期' },
                {
                  validator: validateEmoji,
                },
                {
                  validator: validateTrim,
                },
              ]}>
              <InputLimited
                style={{ maxWidth: '400px' }}
                placeholder="请输入最快周期"
                limited={40} />
            </Item> */}
            <Item
              label="sort（排序）"
              name="sort"
              rules={[
                { required: true, message: '请输入sort（排序）' },
                {
                  validator: validateEmoji,
                },
                {
                  validator: validateTrim,
                },
                {
                  pattern: /^[0-9]*[1-9][0-9]*$/,
                  message: '只能输入正整数',
                },
              ]}>
                <Input placeholder="请输入sort（排序）" />
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
          <Col span={12}>
            <Item label="logo" name="logo" rules={[{ required: true, message: '请上传logo' }]}>
              <UploadWithCrop width={80} height={80} />
            </Item>
  
            {/* <Item
              label="描述"
              name="remark"
              rules={[{ required: true, message: '请输入描述' }]}>
              <TextArea
                placeholder="描述"
                style={{ maxWidth: '500px' }}
                rows={4}
                showCount
                maxLength={500} />
            </Item> */}
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={24}>
            <Item
              noStyle
              shouldUpdate={(prevValues, currentValues) => prevValues.link !== currentValues.link}>
              {({ getFieldValue }) => (
                <Item
                  name="link"
                  label="Link（网址）"
                  rules={[{ required: true, message: '请输入网址' },
                  {
                    pattern: /(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\\.,@?^=%&:/~+#]*[\w\-\\@?^=%&/~\\+#])?/,
                    message: '请输入正确的跳转网址',
                  },
                  {
                    validator: validateEmoji,
                  }]}>
                  <Input
                    placeholder="链接"
                    maxLength={100}
                    suffix={(
                      <span className={styles.suffix}>
                        {getFieldValue('link')?.length || 0}
                        /100
                      </span>
                    )} />
                </Item>
              )}
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
  
  export default ProductForm;
  