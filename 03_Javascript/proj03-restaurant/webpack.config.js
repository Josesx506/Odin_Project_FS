const path = require("path");
const json5 = require('json5');
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "dist"),
      clean: true, // Delete pre-existing dist files
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
        {
          test: /\.(woff|woff2|eot|truetype|opentype)$/i,
          type: "asset/resource",
        },
        {
          test: /\.json5$/i,
          type: "json",
          parser: {
            parse: json5.parse,
          },
        },
      ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html",
            inject: "body",
            scriptLoading: "defer",
        })
    ]
  };