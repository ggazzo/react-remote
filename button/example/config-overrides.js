const webpack = require('webpack');
module.exports = function override(config, env) {
  //do stuff with the webpack config...
    config.module.rules.push({
      test: require.resolve('react'),
      use: [{
        loader: 'expose-loader',
        options: 'React'
      }]
    });
    config.module.rules.push({
      test: require.resolve('react-dom'),
      use: [{
        loader: 'expose-loader',
        options: 'ReactDOM'
      }]
    });
    config.module.rules.push({
      // test: require.resolve('react-dom'),
      test: require.resolve('prop-types/prop-types.min.js'),
      use: [{
        loader: 'expose-loader',
        options: 'PropTypes'
      }]
    });
  return config;
}
