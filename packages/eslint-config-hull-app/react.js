module.exports = {
  extends: [require.resolve('./index.js'), 'plugin:react/recommended'],

  plugins: ['react', 'react-hooks'],

  rules: {
    // ============React规则=============
    'react/default-props-match-prop-types': 1, // 有默认值的属性必须在propTypes中指定  --CUSTOM
    'react/no-array-index-key': 1, // 不要使用数组索引作为key，尽可能使用ID
    'react/no-multi-comp': 1, // 一个文件只能存在一个组件 --CUSTOM
    'react/no-unused-prop-types': 1, // 禁止未使用的prop参数
    'react/prefer-es6-class': 1, // 强制使用es6 extend方法创建组件
    'react/require-default-props': 1, // 非require的propTypes必须制定默认值
    'react/self-closing-comp': 1, // 没有children的组件和html必须使用自闭和标签
    'react/sort-comp': 1, // 对组件的方法排序
    'react/sort-prop-types': 1, // 对prop排序
    'react/style-prop-object': 1, // 组件参数如果是style，value必须是object
    'react/jsx-boolean-value': 1, // 属性值为true的时候，省略值只写属性名
    'react/jsx-closing-tag-location': 1, // 强制开始标签闭合标签位置
    'react/jsx-equals-spacing': 1, // 属性赋值不允许有空格
    'react/jsx-first-prop-new-line': 1, // 只有一个属性情况下单行
    'react/jsx-key': 2, // 强制遍历出来的jsx加key
    'react/jsx-max-props-per-line': [1, { maximum: 1 }], // 每行最多几个属性
    'react/jsx-no-comment-textnodes': 1, // 检查jsx注释
    'react/jsx-pascal-case': 1, // 检查jsx标签名规范
    'react/jsx-wrap-multilines': [
      1,
      {
        declaration: 'parens-new-line',
        assignment: 'parens-new-line',
        return: 'parens-new-line',
        arrow: 'ignore',
        condition: 'ignore',
        logical: 'ignore',
        prop: 'ignore',
      },
    ],
    'react-hooks/rules-of-hooks': 2, // 检查 Hook 的规则
    'react-hooks/exhaustive-deps': 0, // 检查 Effect 的依赖（autofix时会自动添加依赖，不安全，故关掉） --CUSTOM
  },
};
