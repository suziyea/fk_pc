import {
    Form, Input, Row, Col, DatePicker, FormInstance,
  } from 'antd';
  import moment from 'moment';
  import UploadWithCrop from '@/components/UploadWithCrop';
  import InputLimited from '@/components/InputLimited';
  import { validateEmoji, validateTrim } from '@/utils/validator';
  import styles from './index.less';
  
  const { Item } = Form;
  
  interface FormProps {
    form: FormInstance<any>
  }
  
  const BannerForm = ({ form }: FormProps) => (
    <Form
      form={form}
      layout="vertical"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      autoComplete="off">
      <Row gutter={12}>
        <Col span={12}>
          <Item
            name="remark"
            label="banner名称"
            rules={[{
              pattern: /^[^\s]*$/,
              message: '禁止输入空格',
            }, {
              validator: validateEmoji,
            }]}>
            <InputLimited
              placeholder="banner名称"
              limited={10} />
          </Item>
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
  
          <Item
            label="开始时间"
            name="st"
            rules={[{ required: true, message: '请输入开始时间' }]}>
            <DatePicker format="YYYY-MM-DD HH:mm:ss" />
          </Item>
  
          <Item
            label="结束时间"
            name="et">
            <DatePicker format="YYYY-MM-DD HH:mm:ss" />
          </Item>
  
        </Col>
        <Col span={12}>
          <Item name="image" label="banner图" rules={[{ required: true, message: '请上传图片' }]}>
            <UploadWithCrop width={343} height={136} imgType={['jpg', 'png', 'gif']} />
          </Item>
  
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
                rules={[
                {
                  pattern: /(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\\.,@?^=%&:/~+#]*[\w\-\\@?^=%&/~\\+#])?/,
                  message: '请输入正确的跳转网址',
                },
                {
                  validator: validateEmoji,
                }]}>
                <Input
                  placeholder="请输入正确的跳转网址"
                  maxLength={500}
                  suffix={(
                    <span className={styles.suffix}>
                      {getFieldValue('link')?.length || 0}
                      /500
                    </span>
                  )} />
              </Item>
            )}
          </Item>
        </Col>
      </Row>
    </Form>
  );
  
  export default BannerForm;
  