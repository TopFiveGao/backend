import { defineConfig } from 'umi';
import { routes } from './src/routes'


export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // request: {
  //   dataField: "results"
  // },
  mfsu: {},
  // ! 定义路由
  routes,
  // ! 定义通用后台管理系统布局 layout
  layout: {
    // 支持任何不需要 dom 的
    // https://procomponents.ant.design/components/layout#prolayout
    name: 'umi管理系统',
    locale: true,
    layout: 'side',
  },
  fastRefresh: {},
  dva: {
    immer: true
  }
});
