const path = require('path');

module.exports = {
  context: __dirname,
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
      rules: [
          {
              test: /\.(png)$/,
              use: [
                  {
                    loader: 'file-loader'
                  },
              ],
          },
      ],
  },
  devtool: 'source-map'
};
