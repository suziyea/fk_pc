/* eslint-disable no-console */
import { notification, message } from 'antd';
import { history } from 'umi';
import { stringify } from 'querystring';
import { Loading } from './Loadding';
import MyHttp from '@/types/MyHttp';
import { getLocalStorage, removeLocalStorage } from '@/utils/storage';

Loading.delay = 300;
const loadingManger = new Loading();
loadingManger.showHandler = () => {
  console.log('显示loading');
  message.loading('加载中', 0);
};

loadingManger.hideHandler = () => {
  console.log('关闭loading');
  message.destroy();
};

/** 请求拦截器 */
export function requestInterceptors(config: MyHttp.RequestConfig) {
  //  请求头携带token
  const token = getLocalStorage('token');

  if (config.loading) {
    loadingManger.show();
  }
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${token}`
  };
  return config;
}

/** 响应拦截器 */
export async function responseInterceptors(response: MyHttp.Response): Promise<any> {
  if (response.config.responseType === 'arraybuffer') {
    await loadingManger.hide();
    return response.data;
  }
  if (response.config.loading) {
    await loadingManger.hide();
  }
  if (process.env.NODE_ENV === 'production') {
    console.log(`接口"${response.config.url}"`, '传参数是：', response.config.params, response.config.data, '返回数据结构为:', response.data);
  }
  const res = response.data;
  if (res.code === 100000) {
    return res.data;
  }
  if (res.code == null) {
    console.error(`注意：接口"${response.config.url}"未按前端标准返回数据结构，请提醒后端及时修改`);
    return response.data;
  }

  if (!response.config.silence) {
    //   TODO TOAST 弹窗提示
    notification.error({
      message: '系统繁忙',
      description:
        res.msg,
    });
    console.error(res.msg || '接口出错');
  }
  //  自行处理响应数据
  return Promise.reject(new Error(res.msg));
}

/** 响应错误处理 */
export async function responseErrorHandler(error: MyHttp.Error) {
  const { location } = history;
  const { pathname } = location;
  console.log('出错信息:', error, error.config);
  let msg;
  switch (error.response && error.response.status) {
    // 非法的token、或者Token 过期、后端强制token失效
    case 100401:
      //  无效令牌
      notification.error({
        message: '登录失效，请重新登录',
      });
      removeLocalStorage('token');
      removeLocalStorage('userInfo');
      history.replace({
        pathname: '/user/login',
      });
      break;
    case 404:
      msg = '服务端接口不存在';
      break;
    case 500:
      msg = '服务器出错';
      break;
    default:
      msg = error.message;
      if (msg.includes('timeout')) {
        msg = '请求超时，请稍后重试!';
      } else {
        msg = '服务器出错';
      }
      break;
  }
  if (error.config.loading) {
    await loadingManger.hide();
  }
  if (msg && !error.config.silence) {
    notification.error({
      message: '系统繁忙',
      description: msg,
    });
    console.error(msg || '接口出错');
  }
  return Promise.reject(error);
}
