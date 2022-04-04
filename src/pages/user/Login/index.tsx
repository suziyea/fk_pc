import {
  LockOutlined,
  MobileOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Alert, message, Tabs } from 'antd';
import React, { useState,useEffect } from 'react';
import { ProFormCaptcha, ProFormText, LoginForm } from '@ant-design/pro-form';
import { useIntl, history, FormattedMessage, SelectLang, useModel } from 'umi';
import Footer from '@/components/Footer';
// import { getFakeCaptcha } from '@/services/ant-design-pro/login';
import { signIn } from '@/services/api/user';
import { setLocalStorage } from '@/utils/storage';

import styles from './index.less';

// const LoginMessage: React.FC<{
//   content: string;
// }> = ({ content }) => (
//   <Alert
//     style={{
//       marginBottom: 24,
//     }}
//     message={content}
//     type="error"
//     showIcon
//   />
// );

const Login = () => {
  useEffect(() => {
  }, []);
  const [userLoginState, setUserLoginState] = useState({
    status:'',
    nickname: ''
  });
  const [type, setType] = useState<string>('account');
  // const { initialState, setInitialState } = useModel('@@initialState');

  // const fetchUserInfo = async () => {
  //   const userInfo = await initialState?.fetchUserInfo?.();
  //   if (userInfo) {
  //     await setInitialState((s) => ({
  //       ...s,
  //       currentUser: userInfo,
  //     }));
  //   }
  // };

  const handleSubmit = async (params:any) => {
    const { phone, password } = params;

    const msg = await signIn({
      "phone": "110",
      "password": "&&&!@#$%^"
    });
    console.log(msg,'结果',phone,password);
   
    setLocalStorage('token', msg?.access_token);
    setUserLoginState(msg)
    setLocalStorage('userInfo', { ...msg });
    history.push('/');

    // message.success("登录成功！");

    // await fetchUserInfo();
    /** 此方法会跳转到 redirect 参数所在的位置 */
    // if (!history) return;
    // const { query } = history.location;
    // const { redirect } = query as { redirect: string };
      // try {
      //   // 登录
        
      // } catch (error) {
      //   message.error("登录失败，请重试！");
      // }
    // console.log(userLoginState,'用户');
    
  };
  // const { status,nickname } = userLoginState;


  return (
    <div className={styles.container}>
      {/* <div className={styles.lang} data-lang>
        {SelectLang && <SelectLang />}
      </div> */}
      <div className={styles.content}>
        <LoginForm
          logo={<img alt="logo" src="/logo.svg" />}
          title="登 录"
          subTitle="欢迎使用 管理后台系统"
          initialValues={{
            // autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values);
          }}
        >
          <Tabs activeKey={type} onChange={setType}>
            <Tabs.TabPane
              key="account"
              tab="账户密码登录"
            />
            <Tabs.TabPane
              key="mobile"
              tab="手机号登录"
            />
          </Tabs>

          {/* {status === '' && nickname === '' && (
            <LoginMessage
              content="错误的用户名和密码"
            />
          )} */}
          {type === 'account' && (
            <>
              <ProFormText
                name="phone"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder="用户名："
                rules={[
                  {
                    required: true,
                    message: "请输入用户名!"
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder="请输入正确的登录密码！"
                rules={[
                  {
                    required: true,
                    message: "请输入密码！"
                  },
                ]}
              />
            </>
          )}

          {/* {status === 'error' && loginType === 'mobile' && <LoginMessage content="验证码错误" />} */}
          {type === 'mobile' && (
            <>
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <MobileOutlined className={styles.prefixIcon} />,
                }}
                name="phone"
                placeholder="手机号"
                rules={[
                  {
                    required: true,
                    message: "请输入手机号"
                  },
                  {
                    pattern: /^1\d{10}$/,
                    message: "手机号格式错误！"
                  },
                ]}
              />
              <ProFormCaptcha
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                captchaProps={{
                  size: 'large',
                }}
                placeholder="请输入验证码"
                captchaTextRender={(timing, count) => {
                  if (timing) {
                    return `${count} $获取验证码}`;
                  }
                  return "获取验证码"
                }}
                name="captcha"
                rules={[
                  {
                    required: true,
                    message: "请获取验证码"
                  },
                ]}
                onGetCaptcha={async (phone) => {
                  // const result = await getFakeCaptcha({
                  //   phone,
                  // });
                  // if (result === false) {
                  //   return;
                  // }
                  message.success('获取验证码成功！验证码为：1234');
                }}
              />
            </>
          )}
          {/* <div
            style={{
              marginBottom: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              <FormattedMessage id="pages.login.rememberMe" defaultMessage="自动登录" />
            </ProFormCheckbox>
            <a
              style={{
                float: 'right',
              }}
            >
              <FormattedMessage id="pages.login.forgotPassword" defaultMessage="忘记密码" />
            </a>
          </div> */}
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
