const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const IS_DEV = process.env.NODE_ENV !== 'production';

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    home: './src/home/home.js',
    about: './src/about/about.js',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name]_[hash].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules\/(?!@userfeeds)/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        exclude: /(node_modules)/,
        use: ExtractTextPlugin.extract([
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: () => [autoprefixer({ browsers: ['last 2 versions'] })],
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ]),
      },
      {
        test: /\.(css|scss)$/,
        include: /(node_modules)/,
        use: ExtractTextPlugin.extract(['css-loader', 'sass-loader']),
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader',
      },
      {
        test: /\.(woff|ttf|eot|svg|otf)(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/,
        loader: 'url-loader?limit=100000',
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader',
        options: {
          removeTags: true,
          removeSVGTagAttrs: true,
        },
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('[name]_styles.css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV':
        JSON.stringify(process.env.NODE_ENV) || 'development',
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new CopyWebpackPlugin([
      { from: 'assets/', to: 'assets/' },
      { from: 'favicon.ico' },
    ]),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, './src/home/home.html'),
      chunks: ['home'],
    }),
    new HtmlWebpackPlugin({
      filename: 'about.html',
      template: path.resolve(__dirname, './src/about/about.html'),
      chunks: ['about'],
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        ecma: 6,
        compress: true,
      },
      sourceMap: true,
    }),
  ],
  devServer: {
    historyApiFallback: true,
    disableHostCheck: true,
  },
};
