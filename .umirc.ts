import { defineConfig } from 'umi';
import { routes } from './src/routes'

import { logo } from './src/logo'

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
    name: '渝黔高铁管理系统',
    // logo,
    locale: true,
    layout: 'side',
  },
  fastRefresh: {},
});
