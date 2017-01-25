'use strict';
const webpack = require('webpack');
const Visualizer = require('webpack-visualizer-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const glob = require("glob");
const path = require('path');

const isOptimized = Boolean(process.env.isOptimized);

const ENTRY_PATH = './src';
const entry = {};
const files = glob.sync('./src/**/*.js').filter((f) => {
  return !/lib/.test(f);
});
let filepath;
let name;

for (let i = 0; i < files.length; i++) {
  filepath = files[i];
  name = path.basename(filepath, '.js');
  entry[name] = filepath;
}

// entry = glob.sync("./src/**/*.js");
// entry = {
//   main: './src/main.js',
//   main2: './src/main2.js'
// };

console.log('entry', entry);

const commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
const dllPlugin = new webpack.DllReferencePlugin({
  context: __dirname,
  manifest: require('./dist/manifest.json'),
});
const addLibToHtml = new AddAssetHtmlPlugin({ filepath: require.resolve('./dist/lib') });

const plugins = [
  new Visualizer({
    filename: isOptimized ? './stats.html' : './stats2.html'
  }),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'index.html',
    inject: 'body'
  }),
];

console.log('__dirname', __dirname, process.env.isOptimized, isOptimized);

if (isOptimized) {
  plugins.push(commonsPlugin, dllPlugin, addLibToHtml);
}

module.exports = {
  entry,
  output: {
    filename: 'bundle.[name].js',
    path:'./dist'
  },
  plugins
};
