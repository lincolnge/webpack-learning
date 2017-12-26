'use strict';
const webpack = require('webpack');
const Visualizer = require('webpack-visualizer-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const glob = require("glob");
const path = require('path');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

var Dashboard = require('webpack-dashboard');
var DashboardPlugin = require('webpack-dashboard/plugin');
var dashboard = new Dashboard();

const isOptimized = Boolean(process.env.isOptimized);

let entry = {};
const files = glob.sync('./src/**/*.js').filter((f) => {
  return !/lib/.test(f);
});
let filepath;
let name;

console.log('path.dirname(__dirname)', path.dirname(__dirname), __dirname);
for (let i = 0; i < files.length; i++) {
  filepath = files[i];
  name = filepath.substring(2, filepath.length - 3); // 去掉 ./ 还有 .js
  entry[name] = filepath;
  console.log('name', name);
  console.log('filepath', filepath);
}

// entry = glob.sync("./src/**/*.js");
// entry = {
//   'src/main': './src/main.js',
//   'src/main2': './src/main2.js'
// };

console.log('entry', entry);

const commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
const dllPlugin = new webpack.DllReferencePlugin({
  context: __dirname,
  manifest: require('./dist/manifest.json'),
});
const addLibToHtml = new AddAssetHtmlPlugin({
  filepath: require.resolve('./dist/lib'),
  // filepath: require.resolve('./dist/lodash'),
  // filepath: require.resolve('./dist/jquery'),
});

const plugins = [
  new Visualizer({
    filename: isOptimized ? './stats.html' : './stats2.html'
  }),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'index.html',
    inject: 'body'
  }),
  new OpenBrowserPlugin({
    url: 'http://localhost:8080'
  }),
  new webpack.optimize.LimitChunkCountPlugin({maxChunks: 2}), // ?
  new DashboardPlugin(dashboard.setData),
];

console.log('__dirname', __dirname, process.env.isOptimized, isOptimized);

if (isOptimized || true) {
  plugins.push(
    commonsPlugin,
    // addLibToHtml,
    // dllPlugin,
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        // supresses warnings, usually from module minification
        warnings: false
      }
    })
  );
}

console.log('__dirname', __dirname);
const nodeModulesPath = __dirname + '/node_modules';

module.exports = {
  entry,
  devtool: '#cheap-module-source-map',
  output: {
    filename: '[name].js',
    path:'./dist'
  },
  resolve: {
    alias: {
      // jquery: '../node_modules/jquery/dist/jquery.min.js',
      // jquery: path.join(nodeModulesPath, 'jquery/dist/jquery.min.js'),
      // lodash: path.join(nodeModulesPath, 'lodash/lodash.min.js'),
      // 'babel-polyfill': path.join(nodeModulesPath, 'babel-polyfill/dist/polyfill.min.js'),
    }
  },
  plugins,
  module: {
    loaders: [{
      test: /\.js[x]?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015'],
        plugins: ["transform-decorators-legacy"],
      },
      include: path.join(__dirname, '.')
    }]
  },
  devServer: {
    stats: {

    }
  //   // 可通过 IP 地址访问
  //   host: '0.0.0.0',
  //   proxy: [
  //     {
  //       path: /\/(?!static).+/,
  //       // 使用 Staging 环境数据，注意不要污染线上数据
  //       // 目前需要运行命令 `node scripts/reverseproxy.js` 启动服务
  //       target: 'http://127.0.0.1:8419'
  //       // dev test url
  //       // target: 'http://10.4.232.9:8999'
  //       // target: 'http://localhost:8999'
  //     }
  //   ]
  }
};
