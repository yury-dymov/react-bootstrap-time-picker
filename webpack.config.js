var path          = require('path');
var webpack       = require('webpack');
var nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: [
    './src/index'
  ],
  externals: [nodeExternals()],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    library: 'react-bootstrap-time-picker',
    libraryTarget: 'commonjs2'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.NormalModuleReplacementPlugin(/^kronos$/, path.join(__dirname, 'src/index'))
  ],
  module: {
    rules: [
      { test: /\.jsx?$/, use: ['babel-loader', 'eslint-loader'], exclude: /node_modules/ },
      {
        test: /\.json$/,
        use: 'json-loader'
      }
    ]
  },
  resolve: {
    modules: [
      path.join(__dirname, 'src'),
      'node_modules'
    ],
    extensions: ['.js', '.jsx']
  }
};
