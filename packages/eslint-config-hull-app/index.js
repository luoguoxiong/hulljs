module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['prettier', '@typescript-eslint', 'import'],
  rules: {
    camelcase: 'off',
    '@typescript-eslint/naming-convention': [
      0,
      {
        selector: 'property',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        leadingUnderscore: 'allow',
      }, // 强制使用驼峰、帕斯卡、常量大写命名  --CUSTOM
      {
        selector: 'interface',
        format: ['PascalCase'],
      },
      {
        selector: 'typeAlias',
        format: ['PascalCase'],
      },
      {
        selector: 'class',
        format: ['PascalCase'],
      }, // class和interface采用帕斯卡命名(不允许下划线)
    ],
    '@typescript-eslint/interface-name-prefix': 0, // interface命名必须以I开头

    // ============空格 && 缩进=============
    'indent': 'off',
    '@typescript-eslint/indent': ['error', 2],
    'eol-last': [1, 'always'], // 要求或禁止文件末尾存在空行
    'func-call-spacing': [2, 'never'], // 要求或禁止在函数标识符和其调用之间有空格
    'template-tag-spacing': [2, 'always'], // 要求或禁止在模板标记和它们的字面量之间有空格
    'spaced-comment': [
      2,
      'always',
      {
        // 要求或禁止在注释前有空白
        line: {
          markers: ['/'],
          exceptions: ['-', '+'],
        },
        block: {
          markers: ['!'],
          exceptions: ['*'],
          balanced: true,
        },
      },
    ],
    'space-infix-ops': 2, // 要求中缀操作符周围有空格
    'comma-spacing': [2, { after: true }], // 强制在逗号前后使用一致的空格
    'no-trailing-spaces': 2, // 禁用行尾空格
    'space-before-function-paren': [2, 'never'], // 要求或禁止函数圆括号之前有一个空格
    'no-multi-spaces': 2, // 禁止使用多个空格
    'object-curly-spacing': [2, 'always'], // 对象大括号旁必须有空格
    '@typescript-eslint/type-annotation-spacing': 1,
    'no-unexpected-multiline': 2, // 禁止不期待的多行写法
    'operator-linebreak': [
      2,
      'after',
      { overrides: { '?': 'before', ':': 'before' } },
    ], // 过长需换行时操作符的位置  --CUSTOM

    // ============符号相关=============
    'comma-style': [2, 'last'], // 逗号规则
    'comma-dangle': [2, 'always-multiline'], // 行末尾必须有逗号
    'semi-style': [2, 'last'], // 强制分号的位置
    semi: [2, 'always'], // 语句必须分号结尾
    'jsx-quotes': [2, 'prefer-double'], // JSX元素中的字符串必须使用双引号
    quotes: [2, 'single'], // 字符串必须使用单引号
    '@typescript-eslint/member-delimiter-style': [
      2,
      {
        // interface, type内的成员末尾必须使用统一符号（逗号）
        multiline: {
          delimiter: 'semi',
          requireLast: true,
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false,
        },
      },
    ],
    eqeqeq: [2, 'smart'], // 强制使用三等，除了对比null/undefined  --CUSTOM
    'no-extra-parens': 0, // 禁止不必要的括号 (as any写法会被误判)

    // ============箭头函数相关=============
    'arrow-parens': 2, // 要求箭头函数的参数使用圆括号
    'no-confusing-arrow': [2, { allowParens: true }], // 禁止在可能与比较操作符相混淆的地方使用箭头函数
    'arrow-spacing': [2, { before: true, after: true }],
    'arrow-body-style': [2, 'as-needed'], // 要求箭头函数体使用大括号

    // ============其他=============
    'prefer-const': 2, // 要求使用 const 声明那些声明后不再被修改的变量
    'one-var-declaration-per-line': 2, // 禁止一次性定义多个变量
    'key-spacing': [2, { afterColon: true }], // object的key的“:”之后至少有一个空格
    'import/order': 2, // import引入按照一定顺序
    'no-inner-declarations': 1, // 禁止在嵌套的块中出现变量声明或 function 声明  --CUSTOM
    'require-atomic-updates': 1, // 禁止由于 await 或 yield的使用而可能导致出现竞态条件的赋值  --CUSTOM
    'no-case-declarations': 1, // 不允许在 case 子句中使用词法声明  --CUSTOM
    'prefer-rest-params': 0, // 要求使用剩余参数而不是 arguments  --CUSTOM
    'prefer-template': 1, // 要求使用模板字面量而非字符串连接  --CUSTOM
    '@typescript-eslint/consistent-type-assertions': 1, // 强制规范类型定义的方式  --CUSTOM
    '@typescript-eslint/no-this-alias': 1, // 禁止对this使用别名  --CUSTOM
    '@typescript-eslint/no-namespace': 1, // 禁止使用自定义TypeScript模块和名称空间  --CUSTOM
    '@typescript-eslint/no-unused-vars': [
      1,
      { vars: 'all', args: 'none', ignoreRestSiblings: true },
    ], // 提示未使用的变量  --CUSTOM
    'no-undef': 0, // 禁用未声明的变量，除非它们在 /*global */ 注释中被提到 （原因：全局变量较常用，定义在global.d.ts中即可）
    'no-constant-condition': 0, // 禁止在条件中使用常量表达式
    'prefer-spread': 0, // 要求使用扩展运算符而非 .apply()
    'no-useless-escape': 0, // 禁用不必要的转义字符 (意义不大)
    'dot-notation': 0, // object操作要求使用点号 (意义不大)
    'no-unused-vars': 0, // 禁止出现未使用过的变量（与typescript规则重复）
    'promise/always-return': 0, // promise.then必须return
    'promise/no-callback-in-promise': 0, // promise.then中禁止使用回调函数
    '@typescript-eslint/no-var-requires': 0, // 禁止var foo = require("foo"）用import代替
    '@typescript-eslint/explicit-function-return-type': 0, // 对返回类型不明确的函数必须声明类型
    '@typescript-eslint/no-non-null-assertion': 0, // 禁止使用!的非null断言后缀运算符
    '@typescript-eslint/no-use-before-define': 0, // 在定义变量和函数之前禁止使用
    '@typescript-eslint/no-explicit-any': 0, // 禁止使用any类型
    '@typescript-eslint/no-angle-bracket-type-assertion': 0, // 禁止使用尖括号范型
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/no-inferrable-types': 0, // 不允许对初始化为数字，字符串或布尔值的变量或参数进行显式类型声明
  },
  parserOptions: {
    parser: require.resolve('@typescript-eslint/parser'),
    extraFileExtensions: ['.vue'],
    ecmaFeatures: {
      jsx: true,
    },
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-unused-vars': 'off',
      },
    },
  ],
};

