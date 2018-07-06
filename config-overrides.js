/* eslint-disable import/no-extraneous-dependencies */
const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');
/* eslint-disable import/no-extraneous-dependencies */

/* eslint-disable no-param-reassign */
module.exports = function override(config, env) {
  config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);
  config = rewireLess.withLoaderOptions({
    modifyVars: { '@primary-color': '#1DA57A' },
  })(config, env);
  return config;
};
/* eslint-disable no-param-reassign */
