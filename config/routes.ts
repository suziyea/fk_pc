﻿export default [
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
    path: "content",
    code: "content",
    name: "内容管理",
    icon: "table",
    routes: [{
      path: "appContent",
      code: "appContent",
      name: "移动端内容配置(新)",
      component: "./content/appContent",
    }]
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
