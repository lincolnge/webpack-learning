var webpack = require('webpack');
var path = require('path');


module.exports = {
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080',
    './index.js',
    './index2.js'
  ],
  output: {
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel-loader?presets[]=es2015&presets[]=react'],
      include: path.join(__dirname, '.')
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  devServer: {
    stats: {
      colors: false
    },
    proxy: {
      // "/api/*": "http://localhost:3000"
      '/api/*': {
        target: 'http://localhost:3000',
        secure: false
      }
    }
  }
};
