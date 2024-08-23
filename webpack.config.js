const path = require('path')
/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  devtool: 'nosources-source-map',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  target: 'node20',
  externalsPresets: {
    node: true
  },
  optimization: {
    minimize: false,
    usedExports: true,
    providedExports: true,
    sideEffects: true
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
