import angular from 'rollup-plugin-angular';
import commonjs from 'rollup-plugin-commonjs';
import html from 'rollup-plugin-html';
import nodeResolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript';
import uglify from 'rollup-plugin-uglify';

export default {
  entry: 'dist/index.js',
  dest: 'dist/bundle.umd.js',
  exports: 'named',
  sourceMap: false,
  format: 'umd',
  moduleName: '@ngx-prism/core',
  onwarn,
  plugins: [
    angular(),
    commonjs({
      namedExports: {
        'node_modules/rxjs/**': ['named']
      }
    }),
    html({
      include: '**/*.html',
      htmlMinifierOptions: {
        caseSensitive: true // need to do not lower letter
      }
    }),
    nodeResolve({
      // use "es2015" field for ES2015 modules with ES2015 code,
	    // if possible
      es2015: true, // Default: false

      // use "module" field for ES2015 modules with ES5 code,
      // if possible
      module: true, // Default: true

      // use "jsnext:main" if possible
      // – see https://github.com/rollup/rollup/wiki/jsnext:main
      jsnext: true,  // Default: false

      // use "main" field or index.js, even if it's not an ES6 module
      // (needs to be converted from CommonJS to ES6
      // – see https://github.com/rollup/rollup-plugin-commonjs
      main: true,  // Default: true

      extensions: [ '.js', '.json', 'html']
    }),
    typescript({
      typescript: require('./node_modules/typescript')
    }),
    uglify()  
  ],
  globals: {
    '@angular/core': 'ng.core'
  }
};

function onwarn(message) {
  const suppressed = [
    'UNRESOLVED_IMPORT',
    'THIS_IS_UNDEFINED'
  ];

  if (!suppressed.find(code => message.code === code)) {
    return console.warn(message.message);
  }
}

