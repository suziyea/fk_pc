import {
    Button, Card, notification, Form, Row, Col, Input,
  } from 'antd';
  import React, { useEffect } from 'react';
  import { useHistory } from 'umi';
  import { PageContainer } from '@ant-design/pro-layout';
  // import styles from './index.less';
  import DetailPageHeader from '@/components/DetailPageHeader';
  import { validateEmoji } from '@/utils/validator';
  import { useLockFn } from '@/utils';
  import {
    updatePwd,
  } from '@/services/api/user';
  
  const ColumnSettings: React.FC = () => {
    const history = useHistory();
    const [pwdForm] = Form.useForm();
    const {
      validateFields,
    } = pwdForm;
    useEffect(() => {
    }, []);
    const submit = useLockFn(async () => {
      const submitData = await validateFields();
      try {
        await updatePwd(submitData);
        notification.success({
          message: '修改成功',
        });
        localStorage.removeItem('token');
      } catch (error) {
        console.log(error);
        return;
      }
      history.push('/user/login');
    });
  
    return (
      <PageContainer
        title={(
          <DetailPageHeader headerName="修改密码" />
        )}
        breadcrumbRender={false}>
        <Card
          title="修改密码">
          <Form
            form={pwdForm}
            layout="vertical"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            autoComplete="off">
            <Row gutter={12}>
              <Col span={12}>
                <Form.Item
                  name="old_password"
                  label="原密码"
                  rules={[
                    {
                      required: true,
                      message: '请输入原密码!',
                    }, {
                      pattern: /([a-zA-Z0-9!@#$%^&*()_?<>{}]){6,20}/,
                      message: '至少6个字符，最多20个字符',
                    }, {
                      validator: validateEmoji,
                    },
  
                  ]}
                  hasFeedback>
                  <Input.Password
                    maxLength={20} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col span={12}>
                <Form.Item
                  name="new_password"
                  label="新密码"
                  rules={[
                    {
                      required: true,
                      message: '请输入新密码!',
                    }, {
                      validator: validateEmoji,
                    },
                    {
                      pattern: /([a-zA-Z0-9!@#$%^&*()_?<>{}]){6,20}/,
                      message: '至少6个字符，最多20个字符',
                    },
                  ]}
                  hasFeedback>
                  <Input.Password
                    maxLength={20} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="confirmPassword"
                  label="新密码二次确认"
                  dependencies={['new_password']}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: '请输入二次确认密码!',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('new_password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('两次密码输入不一致!'));
                      },
                    }), {
                      validator: validateEmoji,
                    },
                    {
                      pattern: /([a-zA-Z0-9!@#$%^&*()_?<>{}]){6,20}/,
                      message: '至少6个字符，最多20个字符',
                    },
                  ]}>
                  <Input.Password
                    maxLength={20} />
                </Form.Item>
              </Col>
  
            </Row>
            <Button type="primary" onClick={submit}>确认提交</Button>
  
          </Form>
        </Card>
      </PageContainer>
    );
  };
  
  export default ColumnSettings;
  