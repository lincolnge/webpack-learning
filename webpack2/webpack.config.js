const path = require('path');
const webpack = require('webpack');
const Visualizer = require('webpack-visualizer-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    // activate HMR for React

    'webpack-dev-server/client?http://localhost:8080',
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint

    'webpack/hot/only-dev-server',
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates

    './app/index.js',
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel'],
        exclude: /node_modules/,
        // include: path.join(__dirname, 'app')
      },
      {
        test: /\.css$|\.less$/,
        use: [{
          loader: 'style-loader' // creates style nodes from JS strings
        }, {
          loader: 'css-loader' // translates CSS into CommonJS
        }, {
          loader: 'less-loader' // compiles Less to CSS
        }]
      }
    ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
  },
  context: path.resolve(__dirname, '.'),
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
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
      // inject: 'body'
    }),
  ],
  devServer: {
    hot: true,
    // enable HMR on the server

    contentBase: path.resolve(__dirname, 'dist'),
    // contentBase: path.resolve(__dirname, 'dist'),
    // match the output path

    publicPath: '/dist/',
    stats: {
      colors: true
    }
  }
};
