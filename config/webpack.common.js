const year = (new Date()).getFullYear();

const webpack = require('webpack');
const helpers = require('./helpers');

/*
 * Webpack Plugins
 */
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;

/*
 * Webpack Constants
 */
const HMR = helpers.hasProcessFlag('hot');
const METADATA = {
  isDevServer: helpers.isWebpackDevServer(),
};

/*
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = function(options) {
 var isProd = options.env === 'production';
 return {
  /*
   * Static metadata for index.html
   *
   * See: (custom attribute)
   */
  metadata: METADATA,

  /*
   * Cache generated modules and chunks to improve performance for multiple incremental builds.
   * This is enabled by default in watch mode.
   * Pass false to disable it.
   *
   * See: http://webpack.github.io/docs/configuration.html#cache
   * cache: false,
   *
   * The entry point for the bundle
   * Our Angular.js app
   *
   * See: http://webpack.github.io/docs/configuration.html#entry
   */
  entry: {
    'main': './index.ts'
  },

  /*
   * Options affecting the resolving of modules.
   *
   * See: http://webpack.github.io/docs/configuration.html#resolve
   */
  resolve: {

    /*
     * An array of extensions that should be used to resolve modules.
     *
     * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
     */
    extensions: ['.ts', '.js', '.json', '.tpl'],

    // Make sure root is src
    root: helpers.root('src'),

    // remove other default values
    modulesDirectories: ['node_modules'],

    alias: {
      'lodash': helpers.root('node_modules/lodash/index.js')
    },

  },

  target: 'node',

  /*
   * Options affecting the normal modules.
   *
   * See: http://webpack.github.io/docs/configuration.html#module
   */
  module: {
    /*
     * An array of automatically applied loaders.
     *
     * IMPORTANT: The loaders here are resolved relative to the resource which they are applied to.
     * This means they are not resolved relative to the configuration file.
     *
     * See: http://webpack.github.io/docs/configuration.html#module-loaders
     */
    loaders: [
      /*
       * Typescript loader support for .ts and Angular 2 async routes via .async.ts
       *
       * See: https://github.com/s-panferov/awesome-typescript-loader
       */
      {
        test: /\.tpl$/,
        loader: 'string'
      },
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
        exclude: [/\.(spec|template)\.ts$/, /\.tpl$/]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
    ],
    
    postLoaders: [
       {
         test: /\.js$/,
         loader: 'string-replace-loader',
         query: {
           search: 'var sourceMappingUrl = extractSourceMappingUrl\\(cssText\\);',
           replace: 'var sourceMappingUrl = "";',
           flags: 'g'
         }
       }
    ]

  },

  /*
   * Add additional plugins to the compiler.
   *
   * See: http://webpack.github.io/docs/configuration.html#plugins
   */
  plugins: [
    /*
     * Plugin: ForkCheckerPlugin
     * Description: Do type checking in a separate process, so webpack don't need to wait.
     *
     * See: https://github.com/s-panferov/awesome-typescript-loader#forkchecker-boolean-defaultfalse
     */
    new ForkCheckerPlugin()
  ],

  /*
   * Include polyfills or mocks for various node stuff
   * Description: Node configuration
   *
   * See: https://webpack.github.io/docs/configuration.html#node
   */
  node: {
    global: true,
    crypto: false,
    process: true,
    module: false,
    console: true,
    Buffer: true,
    clearImmediate: false,
    setImmediate: false
  }

 };
};

