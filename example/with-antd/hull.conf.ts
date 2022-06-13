import path from 'path';
export default {
  projectType: 'react',
  entry: path.resolve(__dirname, './src/index'),
  extraBabelPlugins: [
    ['import',
      {
        'libraryName': 'antd',
        "libraryDirectory": "es",   
        'style': true,
      }],
  ],
};
