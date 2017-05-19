
import nodeResolve  from 'rollup-plugin-node-resolve';
import commonjs     from 'rollup-plugin-commonjs';
import uglify       from 'rollup-plugin-uglify';

export default {
  entry: 'dist/index.js',
  dest: 'dist/bundle.umd.js',
  exports: 'named',
  sourceMap: false,
  format: 'umd',
  moduleName: '@ngx-prism/core',
  onwarn,
  plugins: [
      commonjs({
          namedExports: {
            'node_modules/rxjs/**': [ 'named' ]
          }
      }),
      nodeResolve({
        jsnext: true,
        module: true,
        extensions: [ '.js', '.json', 'html']
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

