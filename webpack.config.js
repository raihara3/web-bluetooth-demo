const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  watch: true,
  entry: './src/js/index.js',
  resolve: {
    extensions: [ '.js' ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          context: __dirname + '/src',
          from: '**/*.{html,jpg,png,gltf}',
          to: __dirname + '/dist'
        },
      ],
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080,
    open: true
  }
};