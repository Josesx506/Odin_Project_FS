// webpack.config.js
const path = require('path');

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
    ],
  },
};