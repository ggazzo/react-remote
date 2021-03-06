import typescript from 'rollup-plugin-typescript2'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
// import postcss from 'rollup-plugin-postcss-modules'
import bundleSize from 'rollup-plugin-bundle-size';
import postcss from 'rollup-plugin-postcss'
import resolve from 'rollup-plugin-node-resolve'
import url from 'rollup-plugin-url'
import svgr from '@svgr/rollup'
import replace from 'rollup-plugin-replace';
import babel from 'rollup-plugin-babel';

import pkg from './package.json'

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true
    },

    {
      file: pkg.module,
      format: 'umd',
      exports: 'named',
      name: pkg.name,
      sourcemap: true
    }
  ],
  plugins: [
    external(),
    bundleSize(),
    postcss({
      // modules: true
    }),
    // babel({
    //   babelrc: false,
    //   presets: [['env', { modules: false }]],
    // }),
    url(),
    svgr(),
    resolve({
      browser: true,
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    typescript({
      rollupCommonJSResolveHack: true,
      clean: true
    }),
    commonjs(
{
      include: 'node_modules/**',
      namedExports: {
        'node_modules/react-is/index.js': ['isValidElementType', 'isElement', 'ForwardRef']
      }

    }
    ),
    // babel({
    //   exclude: 'node_modules/**' // only transpile our source code
    // })
  ]
}
