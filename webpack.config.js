const path = require("path");

module.exports = {
  entry: "./blocks/block.js",
  output: {
    path: path.join(__dirname, "blocks"),
    filename: "block.build.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        },
      }
    ]
  }
};
