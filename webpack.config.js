var path = require('path')
const PATHS = {
  src: path.join(__dirname, './src'),
  build: path.join(__dirname, './dist')
}
module.exports = {
  entry: PATHS.src + '/laonetics.ts',
  output: {
    path: PATHS.build,
    filename: 'laonetics.min.js',
    library: 'laonetics',
    libraryTarget: 'umd'
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
  }
}
