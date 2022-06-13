import { defineConfig } from 'umi';

export default defineConfig({
  title: 'hulljs',
  favicon: '/images/logo.png',
  logo: '/images/logo.png',
  mode: 'site',
  outputPath: './dist',
  hash: true,
  navs: [
    {
      title: '文档',
      path: '/guide',
    },
    {
      title: '配置',
      path: '/setting',
    },
    {
      title: '工具',
      path: '/plugins',
    },
    {
      title: 'example',
      path: '/example',
    },
    {
      title: 'Github',
      path: 'https://github.com/luoguoxiong/hulljs',
    },
  ],
//     {
//       title: 'utils',
//       path: '/utils',
//     },
//     {
//       title: 'hooks',
//       path: '/hooks',
//     },
//     {
//       title: 'components',
//       path: '/components',
//     },
//     {
//       title: 'constants',
//       path: '/constants',
//     },
//     {
//       title: 'GitLab',
//       path: 'https://gitlab.codemao.cn/frontend/new-retail/dcc/dcc-tool-kit',
//     },
//   ],
});
