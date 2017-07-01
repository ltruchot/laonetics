var path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
  entry: path.resolve(__dirname, 'src', 'app.ts'),
  output: {
    filename: './assets/script/bundle.js'
  },

  devtool: 'source-map',
  resolve: {
    // Add '.ts' as a resolvable extension.
    extensions: ['.ts', '.js']
  },

  module: {
    loaders: [
      // all files with a '.ts'  extension will be handled by `ts-loader`
      { test: /\.ts?$/, loader: 'ts-loader' }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: './assets', to: 'assets' }
    ])
  ]
}
