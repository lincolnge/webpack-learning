const webpack = require('webpack');
const path = require('path');
const outputPath = path.join(__dirname, 'dist');
const fileName = '[name].js';

// 资源依赖包，提前编译
// const lib = [
//   'lodash',
//   'jquery',
// ];

let entry = {
  lodash: ['lodash/lodash.min.js'],
  // lodash: ['lodash'],
  jquery: ['jquery/dist/jquery.min.js'],
  // jquery: ['jquery'],
}

entry = {
  lib: ['lodash/lodash.min.js', 'jquery/dist/jquery.min.js'],
};

const plugin = [
  new webpack.DllPlugin({
    /**
     * path
     * 定义 manifest 文件生成的位置
     * [name]的部分由entry的名字替换
     */
    path: path.join(outputPath, 'manifest.json'),
    /**
     * name
     * dll bundle 输出到那个全局变量上
     * 和 output.library 一样即可。
     */
    name: '[name]',
    context: __dirname
  }),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      // supresses warnings, usually from module minification
      warnings: false
    }
  }),
];

// const nodeModulesPath = './node_modules';

module.exports = {
  devtool: '#cheap-module-source-map',
  entry,
  resolve: {
    alias: {
      // jquery: path.join(nodeModulesPath, 'jquery/dist/jquery.min.js'),
      // lodash: path.join(nodeModulesPath, 'lodash/lodash.min.js'),
    }
  },
  output: {
    path: outputPath,
    filename: fileName,
    /**
     * output.library
     * 将会定义为 window.${output.library}
     * 在这次的例子中，将会定义为`window.vendor_library`
     */
    library: '[name]',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  plugins: plugin
};
