const path = require('path');
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const postCss = require('postcss');
const cssVariables = require('postcss-css-variables');

const fs = require('fs');

const mycss = fs.readFileSync('/dist/app.css', 'utf-8');

var output = postCss([
  cssVariables(/*options*/)
])
  .process(mycss)
  .css;


module.exports = {
  entry: {
    app: './src/index.js'
  },
  devtool: 'inline-source-map', //https://webpack.js.org/configuration/devtool/ контролирует используется ЛИ(и как исп.) sourceMap
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist'
  },
  devServer: {
    overlay: true
  },
  module: {
    rules: [
      //JS
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/'
      },
      //CSS
      {
        test: /\.css$/,
        use: [
          'style-loader',
          miniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          }, {
            loader: 'postcss-loader',
            options: { sourceMap: true, config: { path: 'src/js/postcss.config.js' } }
          }
        ]
      },
      //SASS
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          miniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          }, {
            loader: 'postcss-loader',
            options: { sourceMap: true, config: { path: 'src/js/postcss.config.js' } }
          }, {
            loader: 'sass-loader',
            options: { sourceMap: true }
          }
        ]
      },
      //TS
      {
        test: /\.tsx?/,
        use: 'ts-loader', // все файлы с расширением tsx будет обрабатывать ts-loader
        exclude: /node_modules/
      }
    ],
    // preLoaders: [
    //   // Все карты кода для выходных '.js'-файлов будет дополнительно обрабатывать `source-map-loader`
    //   { test: /\.js$/, loader: "source-map-loader" }
    // ]
  },
  resolve: { // обрабатываемые расширения файлов
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins: [
    new miniCssExtractPlugin({
      filename: "[name].css",
    })
  ],
}