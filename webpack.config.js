const webpack = require('webpack');
var Visualizer = require('webpack-visualizer-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const entry = {
  main: './src/main',
  main2: './src/main2'
};

const commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
let plugins = [
  new Visualizer(),
  new webpack.DllReferencePlugin({
    context: '.',
    manifest: require('./dist/manifest.json'),
  }),
  new HtmlWebpackPlugin({
    title: 'Lincoln\'s World',
    chunks: ['main', 'main2'],
    filename: 'index.html',
    template: 'dist/index.html',
  })
];

console.log('__dirname', __dirname, process.env.isOptimized);

if (Boolean(process.env.isOptimized) === true) {
  plugins.push(commonsPlugin);
}

module.exports = {
  entry,
  output: {
    filename: 'bundle.[name].js',
    path:'./dist'
  },
  plugins
};
