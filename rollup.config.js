import { nodeResolve } from '@rollup/plugin-node-resolve';
import scss from 'rollup-plugin-scss';
import terser from '@rollup/plugin-terser';

const pkg = require('./package.json');
const banner = `/*! ${pkg.name} v${pkg.version} | MIT */`;

export default [
  // ESM + CJS
  {
    input: 'src/crsl.js',
    plugins: [
      scss({ fileName: 'crsl.min.css', outputStyle: 'compressed' })
    ],
    output: [
      { file: pkg.module, format: 'es', banner },
      { file: pkg.main, format: 'cjs',  banner },
      { file: 'dist/crsl.iife.js', format: 'iife', name: 'Crsl', exports: 'default', banner },
    ],
  },
  // Minified files
  {
    input: 'src/crsl.js',
    plugins: [
      nodeResolve(),
      terser(),
      scss({ fileName: 'crsl.min.css', outputStyle: 'compressed' })
    ],
    output: [
      { file: 'dist/crsl.esm.min.js', format: 'es', banner },
      { file: 'dist/crsl.cjs.min.js', format: 'cjs', banner },
      { file: 'dist/crsl.iife.min.js', format: 'iife', name: 'Crsl', exports: 'default', banner },
    ]
  },
];