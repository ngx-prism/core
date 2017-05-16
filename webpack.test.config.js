var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: {
    'main': './src/index.ts'
  },

  resolve: {
    extensions: ['.ts','.js'],
    modules: [
      path.resolve(__dirname, 'node_modules'),
      // path.resolve(__dirname, 'src'),
    ]
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    library: 'nvd3-chart',
    libraryTarget: 'umd',
    filename: '[name].js'
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          'awesome-typescript-loader'
        ]
      }
    ]
  },

  plugins: [
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)@angular/,
      path.resolve(__dirname, 'src'),
      {
        // your Angular Async Route paths relative to this root directory
      }
    )
  ],

  /*
  * Include polyfills or mocks for various node stuff
  * Description: Node configuration
  *
  * See: https://webpack.github.io/docs/configuration.html#node
  */
  node: {
    global: true,
    crypto: 'empty',
    process: true,
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
};