const webpack = require('webpack');
var Visualizer = require('webpack-visualizer-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const isOptimized = Boolean(process.env.isOptimized);

const entry = {
  main: './src/main',
  main2: './src/main2'
};

const commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
const dllPlugin = new webpack.DllReferencePlugin({
  context: '.',
  manifest: require('./dist/manifest.json'),
});

let plugins = [
  new Visualizer({
    filename: './stats.html'
  }),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: isOptimized ? 'dist/index.html.tmpl' : 'index.html',
    inject: 'body'
  })
];

console.log('__dirname', __dirname, process.env.isOptimized, isOptimized);

if (isOptimized === true) {
  plugins.push(commonsPlugin, dllPlugin);
}

module.exports = {
  entry,
  output: {
    filename: 'bundle.[name].js',
    path:'./dist'
  },
  plugins
};
