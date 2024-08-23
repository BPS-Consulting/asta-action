const path = require('path')
/**
 * @type {import('@rspack/cli').Configuration}
 */
module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  devtool: 'nosources-source-map',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  externalsPresets: {
    node: true
  },
  optimization: {
    minimize: false,
  },
  module: {
    rules: [
        {
            test: /\.ts$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        }
    ]
  },
  resolve:{
    extensions: ['.ts', '.js', '.json']
  } 
}
