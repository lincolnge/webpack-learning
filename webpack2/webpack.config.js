const path = require('path');
const webpack = require('webpack');
const Visualizer = require('webpack-visualizer-plugin');

module.exports = {
  entry: [
    './app/index.js',
  ],
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: ['babel'],
      include: path.join(__dirname, './app')
    }]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    // 配置模块的根目录，可以是数组。NOTE: 必须是绝对路径
    modules: [
      path.resolve('./node_modules'),
      path.resolve(__dirname),
    ]
  },
  resolveLoader: {
    modules: [
      path.join(__dirname, 'node_modules')
    ],
    moduleExtensions: ['-loader']
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new Visualizer({
      filename: 'stats-view.html'
    }),
  ],
  devServer: {
    publicPath: '/dist/',
    stats: {
      colors: true
    }
  }
};
