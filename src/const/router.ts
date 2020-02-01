import Index from '../pages/index/index';
import Test from '../pages/testPage/index';

export default [
  // 首页
  {
    routeProps: {
      path: '/',
      component: Index,
      exact: true,
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
      exact: false,
    },
    menuProps: {
      title: '测试',
    },
    link: {
      to: '/test',
    },
  }
];