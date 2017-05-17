var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: {
    'main': './src/index.ts'
  },

  resolve: {
    extensions: ['.ts','.js'],
    modules: [
      path.resolve(__dirname, 'node_modules')
    ]
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    library: '@ngx-prism/core',
    libraryTarget: 'umd',
    filename: '[name].js'
  },

  module: {
    rules: [
      // .ts files for TypeScript
      {
        test: /\.ts$/,
        loaders: [
          'awesome-typescript-loader',
          'angular2-template-loader',
          'tslint-loader'
        ]
      },
      { test: /\.html$/, use: 'raw-loader' },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        use: ['file-loader',]
      },
      { test: /\.scss$/, use: ['to-string-loader', 'css-loader', 'postcss-loader',  'sass-loader'] },
      { test: /\.css$/, use: ['to-string-loader', 'css-loader', 'postcss-loader' ] }
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