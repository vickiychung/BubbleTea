const path = require('path');

module.exports = {
  context: __dirname,
  entry: './src/index.js',
  output: {
    // path: path.resolve(__dirname, 'src'),
    // filename: 'main.js'
  },
  devtool: 'source-map'
};
