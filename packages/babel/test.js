
var path = require('path');

var obj = {};
function isType(s, typeString) {
  return obj.toString.call(s) === `[object ${ typeString }]`;
}

function isObject(s) {
  return isType(s, 'Object');
}

function validateBoolOption(name, value, defaultValue) {
  if (typeof value === 'undefined') {
    value = defaultValue;
  }

  if (typeof value !== 'boolean') {
    throw new Error(`Preset zuzuche: "${ name }" option must be a boolean.`);
  }

  return value;
}

var assign = Object.assign;

var DEFAULT_ENV_OPTIONS = {
  targets: {},
  ignoreBrowserslistConfig: false, // 忽略browserslist文件配置
  useBuiltIns: false, // 怎么运用 polyfill
  modules: false, // 是否转译module syntax，默认是 commonjs
  debug: false, // 是否输出启用的plugins列表
  exclude: ['transform-typeof-symbol'], // 强制不启用的 plugins
};

var DEFAULT_TRANSFORM_RUNTIME_OPTIONS = {
  corejs: 3,
  version: require('@babel/runtime/package.json').version,
  helpers: true,
  regenerator: true,
  useESModules: true,
  absoluteRuntime: true,
};

var DEFAULT_REACT_OPTIONS = {
  useBuiltIns: true,
};

module.exports = function(context, options) {
  var ENV = process.env.BABEL_ENV || process.env.NODE_ENV;
  var isEnvProduction = ENV === 'production';
  var isEnvDevelopment = ENV === 'development';

    // ====================
    // presets config
  var envOptions = (options && isObject(options.env))
    ? assign({}, DEFAULT_ENV_OPTIONS, options.env)
    : assign({}, DEFAULT_ENV_OPTIONS);

  var reactOptions = (options && isObject(options.react))
    ? assign({}, DEFAULT_REACT_OPTIONS, options.react)
    : assign({}, DEFAULT_REACT_OPTIONS);
  reactOptions.development = isEnvDevelopment;

  var presets = [
    [require('@babel/preset-env').default, envOptions],
    [require('@babel/preset-react').default, reactOptions],
  ];

  var isTypeScriptEnabled = validateBoolOption('ts', options.ts, false);
  if (isTypeScriptEnabled) {
    presets.push([require('@babel/preset-typescript').default]);
  }

    // ====================
    // plugins config
  var transformRuntimeOptions = (options && isObject(options['transform-runtime']))
    ? assign({}, DEFAULT_TRANSFORM_RUNTIME_OPTIONS, options['transform-runtime'])
    : assign({}, DEFAULT_TRANSFORM_RUNTIME_OPTIONS);
  if (transformRuntimeOptions.absoluteRuntime) {
    transformRuntimeOptions.absoluteRuntime = path.dirname(
      require.resolve('@babel/runtime/package.json')
    );
  }

  var classPropertiesOptions = (options && isObject(options['class-properties']))
    ? assign({}, options['class-properties'])
    : { loose: true };

  var privateMethodsOptions = (options && isObject(options['private-methods']))
    ? assign({}, options['private-methods'])
    : { loose: true };

  var privatePropertyInObjectOptions = (options && isObject(options['private-property-in-object']))
    ? assign({}, options['private-property-in-object'])
    : { loose: true };

  var plugins = [
    [require('@babel/plugin-proposal-class-properties').default, classPropertiesOptions],
    [require('@babel/plugin-proposal-private-methods').default, privateMethodsOptions],
    [require('@babel/plugin-proposal-private-property-in-object').default, privatePropertyInObjectOptions],
    [require('@babel/plugin-proposal-numeric-separator').default],
    [require('@babel/plugin-transform-runtime').default, transformRuntimeOptions],
  ];

  if (isTypeScriptEnabled) {
    plugins.unshift([require('@babel/plugin-proposal-decorators').default, false]);
  }

  if (isEnvProduction) {
    plugins.push([
            // Remove PropTypes from production build
      require('babel-plugin-transform-react-remove-prop-types').default,
      {
        removeImport: true,
      },
    ]);
  }

  plugins.push(require('@babel/plugin-proposal-optional-chaining').default);
  plugins.push(require('@babel/plugin-proposal-nullish-coalescing-operator').default);

    // ====================
    // overrides config
  var overrides = [];
  if (isTypeScriptEnabled) {
    overrides.push({
      test: /\.tsx?$/,
      plugins: [
        [
          require('@babel/plugin-proposal-decorators').default,
          { legacy: true },
        ],
      ],
    });
  }

  return {
    presets: presets,
    plugins: plugins,
    overrides: overrides,
  };
};
