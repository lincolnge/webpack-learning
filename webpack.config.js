const webpack = require('webpack');
const Visualizer = require('webpack-visualizer-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const isOptimized = Boolean(process.env.isOptimized);

const entry = {
  main: './src/main',
  main2: './src/main2'
};

const commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
const dllPlugin = new webpack.DllReferencePlugin({
  context: __dirname,
  manifest: require('./dist/manifest.json'),
});
const addLibToHtml = new AddAssetHtmlPlugin({ filepath: require.resolve('./dist/lib') });

let plugins = [
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
