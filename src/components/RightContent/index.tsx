import { Menu } from 'antd';
import React, { useCallback } from 'react';
import { useHistory, Location } from 'umi';
import {
  LogoutOutlined, ToolOutlined,
} from '@ant-design/icons';
import { stringify } from 'querystring';
import styles from './index.less';
import HeaderDropdown from '@/components/HeaderDropdown';
import { getLocalStorage, removeLocalStorage } from '@/utils/storage';
// import { signOut } from '@/services/api/user';

export type SiderTheme = 'light' | 'dark';

const RightContent: React.FC = () => {
  const history = useHistory();
  // const { initialState } = useModel<any>('@@initialState');

  // if (!initialState || !initialState.settings) {
  //   return null;
  // }

  // const { navTheme, layout } = initialState.settings;
  // let className = styles.right;

  // if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
  //   className = `${styles.right}  ${styles.dark}`;
  // }

  const onMenuClick = useCallback(
    (event) => {
      const { key } = event;
      if (key === 'logout') {
        // setInitialState((s: any) => ({ ...s, currentUser: undefined }));
        loginOut();
        history.push('/user/login');

        return;
      }
      if (key === 'password') {
        history.push(`/user/${key}`);
        return;
      }
      history.push(`/account/${key}`);
    },
    [],
  );

  const p1 = new Promise((resolve) => {
    resolve(1);
  });

  /**
 * 退出登录，并且将当前的 url 保存
 */
  const loginOut = async() => {
    const { query = {}, pathname,search } = history.location as Location;
    const { redirect } = query;
    await p1;
    removeLocalStorage('token');
    removeLocalStorage('userInfo');
    // Note: There may be security issues, please note
    if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
        pathname: '/user/login',
        search: stringify({
          redirect: pathname + search,
        }),
      });
    }
  };

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      <Menu.Item key="password">
        <ToolOutlined />
        修改密码
      </Menu.Item>
      <Menu.Item key="logout">
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      {
        (process.env.NODE_ENV === 'development') && <span style={{ color: '#fff', marginRight: '20px', cursor: 'pointer' }} onClick={() => window.open('/#/~docs')}>组件库文档入口(仅开发)</span>
      }
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          <span style={{ color: '#fff', marginRight: '20px', cursor: 'pointer' }}>{getLocalStorage('userInfo')?.nickname || '未知用户'}</span>
        </span>
      </HeaderDropdown>
    </div>
  );
};

export default RightContent;
