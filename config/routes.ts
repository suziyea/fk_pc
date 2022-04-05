﻿export default [
  {
    path: "/user",
    layout: false,
    routes: [
      {
        path: "/user",
        routes: [
          {
            name: "login",
            path: "/user/login",
            component: "./user/Login",
          },
        ],
      },
      {
        component: "./404",
      },
    ],
  },
  {
    path: "/welcome",
    name: "welcome",
    icon: "smile",
    component: "./Welcome",
  },
  {
    path: "member",
    code: "member",
    name: "会员管理",
    icon: "user",
    routes: [
      {
        path: "memberList",
        code: "memberList",
        name: "会员列表",
        component: "./member/memberList",
      },
      { component: "./404" },
    ],
  },
  {
    path: "content",
    code: "content",
    name: "渠道管理",
    icon: "NotificationOutlined",
    routes: [
      {
        path: "channelList",
        code: "channelList",
        name: "渠道列表",
        component: "./content/channelList",
      },
      {
        path: "addChannel",
        code: "addChannel",
        name: "新建渠道",
        hideInMenu: true,
        component: "./content/addChannel",
      },
      {
        path: "channelDetail",
        code: "channelDetail",
        name: "渠道详情",
        hideInMenu: true,
        component: "./content/channelDetail",
      },
    ],
  },
  {
    path: "product",
    code: "product",
    name: "产品管理",
    icon: "shop",
    routes: [
      {
        path: "productList",
        code: "productList",
        name: "产品列表",
        component: "./product/productList",
      },
      { component: "./404" },
    ],
  },
  {
    path: "otherSet",
    code: "otherSet",
    name: "otherSet",
    icon: "PayCircleOutlined",
    routes: [
      {
        path: "otherSetList",
        code: "otherSetList",
        name: "otherSet列表",
        component: "./otherSet/otherSetList",
      },
      { component: "./404" },
    ],
  },
  {
    path: "imageSet",
    code: "imageSet",
    name: "imageSet",
    icon: "PictureOutlined",
    routes: [
      {
        path: "bannerList",
        code: "bannerList",
        name: "banner列表",
        component: "./imageSet/bannerList",
      },
      {
        path: "imageSetList",
        code: "imageSetList",
        name: "图片列表",
        component: "./imageSet/imageSetList",
      },
      
      { component: "./404" },
    ],
  },
  {
    path: "/",
    redirect: "/welcome",
  },
  {
    component: "./404",
  },
];
