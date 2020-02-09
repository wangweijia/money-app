import Index from '../pages/index/index';
import Test from '../pages/testPage/index';

import Level from '../pages/level/level';
import Money from '../pages/money/money';
import Tag from '../pages/tag/tag';

export default [
  // 首页
  {
    routeProps: {
      path: '/',
      component: Index,
    },
    menuProps: {
      title: '首页',
    },
    link: {
      to: '/',
    },
    isIndex: true
  }, 
  // 测试页面
  {
    routeProps: {
      path: '/test',
      component: Test,
    },
    menuProps: {
      title: '测试',
    },
    link: {
      to: '/test',
    },
  },
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
  // 价格
  {
    routeProps: {
      path: '/money',
      component: Money,
    },
    menuProps: {
      title: '金额',
    },
    link: {
      to: '/money',
    },
  },
  // 标签
  {
    routeProps: {
      path: '/tag',
      component: Tag,
    },
    menuProps: {
      title: '标签',
    },
    link: {
      to: '/tag',
    },
  },
];