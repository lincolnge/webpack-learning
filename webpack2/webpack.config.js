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
      use: ['babel-loader'],
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
