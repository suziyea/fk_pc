// import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
// import { SettingDrawer } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import type { RunTimeLayoutConfig } from 'umi';
import { history } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
// import { BookOutlined, LinkOutlined } from '@ant-design/icons';
// import defaultSettings from '../config/defaultSettings';
import { getLocalStorage } from './utils/storage';
import { stringify } from 'querystring';

const isDev = process.env.NODE_ENV === 'development';
console.log(isDev);

const loginPath = '/user/login';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

export interface IPermission {
  hasRoutes: string[]
}
/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
 export async function getInitialState(): Promise<IPermission> {
  // // 如果是登录页面，不执行
  if (history.location.pathname !== loginPath) {
    // const currentUser = await getUserInfo();
    // setLocalStorage('userInfo', currentUser);
    return {
      hasRoutes: [],
    };
  }
  return {
    hasRoutes: [],
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState }:any) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      if (getLocalStorage('token')) {
        return;
      }
      // 如果没有登录，重定向到 login
      if (location.pathname !== loginPath) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: location.pathname + location.search,
          }),
        });
        return;
      }
    },
    // links: isDev
    //   ? [
    //       <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
    //         <LinkOutlined />
    //         <span>OpenAPI 文档</span>
    //       </Link>,
    //       <Link to="/~docs" key="docs">
    //         <BookOutlined />
    //         <span>业务组件文档</span>
    //       </Link>,
    //     ]
    //   : [],
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    // childrenRender: (children, props) => {
    //   // if (initialState?.loading) return <PageLoading />;
    //   return (
    //     <>
    //       {children}
    //       {!props.location?.pathname?.includes('/login') && (
    //         <SettingDrawer
    //           disableUrlParams
    //           enableDarkTheme
    //           settings={initialState?.settings}
    //           onSettingChange={(settings) => {
    //             setInitialState((preInitialState) => ({
    //               ...preInitialState,
    //               settings,
    //             }));
    //           }}
    //         />
    //       )}
    //     </>
    //   );
    // },
    // ...initialState?.settings,
    menuHeaderRender: undefined,
    ...initialState?.settings,
    logo: require('@/assets/img/logo.png')

  };
};
