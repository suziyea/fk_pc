export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: '用户',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '二级页面',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: '查询表格',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    path: "member",
    code: "member",
    name: "会员管理",
    icon: "user",
    routes: [{
      path: "memberList",
      code: "memberList",
      name: "会员列表",
      component: "./member/memberList",
    },
    { component: "./404" },
    ]
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
