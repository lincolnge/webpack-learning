const path = require('path');
const webpack = require('webpack');
const Visualizer = require('webpack-visualizer-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const injectDevServer = require('./dev-server-inject');

// 当访问 / 时，跳转到 /dist/index.html
// injectDevServer();

const argvStr = process.argv.join();
const isBuild = argvStr.indexOf('webpack') > -1 && argvStr.indexOf('webpack-dev-server') === -1;

const webpackConfig = {
  entry: {
    index: [
      // activate HMR for React
      'react-hot-loader/patch',

      // 'webpack-dev-server/client?http://localhost:8080',
      // // bundle the client for webpack-dev-server
      // // and connect to the provided endpoint
      //
      // 'webpack/hot/only-dev-server',
      // // bundle the client for hot reloading
      // // only- means to only hot reload for successful updates
      './app/index.js',
    ],
    index2: ['./app/index2.js'],
    // vendor: ['lodash'],
  },
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
    // filename: '[name].js',
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    // publicPath: path.resolve(__dirname, 'dist'),
  },
  context: path.resolve(__dirname, '.'),
  resolve: {
    extensions: ['.js', '.jsx'],
    // 配置模块的根目录，可以是数组。NOTE: 必须是绝对路径
    modules: [
      path.resolve('./node_modules'),
      path.resolve(__dirname),
    ],
    alias: {
      '~': path.resolve(__dirname),
    }
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
    // 这个插件的作用是在热加载时直接返回更新文件名，而不是文件的id
    new webpack.NamedModulesPlugin(),
    /**
     * 模块热替换(HMR - Hot Module Replacement)功能会在应用程序运行过程中替换、添加或删除模块，而无需重新加载整个页面。
     * https://doc.webpack-china.org/plugins/hot-module-replacement-plugin/
     * 永远不要在生产环境(production)下启用 HMR？
     */
    new webpack.HotModuleReplacementPlugin(),
    // new Visualizer({
    //   filename: 'stats-view.html'
    // }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
      filename: 'index.html',
      // inject: 'true',
      // chunks: ['vendor', 'index'],
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      // filename: '[name].js',
      filename: '[name]-[hash].js',
      chunkFilename: '[name]-[chunkhash].js',
      // children: true,
      // async: 'true',
      // chunks: ['lodash'],
    }),
    // new AddAssetHtmlPlugin({
    //   filepath: require.resolve('./some-file'),
    // }),
  ],
  devServer: {
    compress: true,
    hot: true, // enable HMR on the server

    contentBase: path.resolve(__dirname, 'dist'), // match the output path
    historyApiFallback: true,

    // publicPath: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    stats: {
      colors: true
    },
    host: '0.0.0.0',
    port: 9565,
    proxy: [
      {
        // 使用 Staging 环境数据，注意不要污染线上数据
        path: ['/api', '/backend', '/wakaka'],
        // dev test url
        target: 'http://127.0.0.1:8415'
      }
    ]
  }
};


if (!isBuild) {
  // devtool 不要用 eval 模式，虽然这能带来初次构建减少 1s 左右的好处，
  // 但是这会导致刷新页面中断无效，影响调试
  // Chrome 升级49+ 后会导致 cheap-module-source-map 失效
  // https://github.com/webpack/webpack/issues/2145
  webpackConfig.devtool = '#cheap-module-source-map';
}
module.exports = webpackConfig;
