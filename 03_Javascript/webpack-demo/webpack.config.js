// webpack.config.js
const path = require('path');
const toml = require('toml');
const yaml = require('yamljs');
const json5 = require('json5');

// Use a html template
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// plugins: [
//     new HtmlWebpackPlugin({
//         template: './src/template.html',
//     }),
// ],
// ...


module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    // filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true, // Delete pre-existing dist files
  },
  module: {
    rules: [
      // Including css files
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      // Including images
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      // Including fonts
      {
        test: /\.(woff|woff2|eot|truetype|opentype)$/i,
        type: 'asset/resource',
      },
      // Including csv and xml files
      {
        test: /\.(csv|tsv)$/i,
        use: ['csv-loader'],
      },
      {
        test: /\.xml$/i,
        use: ['xml-loader'],
      },
      {
        test: /\.json5$/i,
        type: 'json',
        parser: {
          parse: json5.parse,
        },
      },
    ],
  },
};