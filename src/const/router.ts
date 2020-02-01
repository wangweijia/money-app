import Index from '../pages/index/index';
import Test from '../pages/testPage/index';

import Level from '../pages/level/level';

export default [
  // // 首页
  // {
  //   routeProps: {
  //     path: '/',
  //     component: Index,
  //   },
  //   menuProps: {
  //     title: '首页',
  //   },
  //   link: {
  //     to: '/',
  //   },
  //   isIndex: true
  // }, 
  // // 测试页面
  // {
  //   routeProps: {
  //     path: '/test',
  //     component: Test,
  //   },
  //   menuProps: {
  //     title: '测试',
  //   },
  //   link: {
  //     to: '/test',
  //   },
  // },
  // 层级
  {
    routeProps: {
      path: '/level',
      component: Level,
    },
    menuProps: {
      title: '层级',
    },
    link: {
      to: '/level',
    },
  },
];