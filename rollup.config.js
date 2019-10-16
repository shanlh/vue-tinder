import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import vue from 'rollup-plugin-vue'
import babel from 'rollup-plugin-babel'
import { uglify } from 'rollup-plugin-uglify'

export default {
  input: 'src/components/index.js',
  output: {
    name: 'vue-tinder',
    file: 'lib/vue-tinder.js',
    format: 'umd'
  },
  plugins: [
    resolve(),
    commonjs({ sourceMap: false }),
    vue({ needMap: false }),
    babel({
      runtimeHelpers: true,
      extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.vue']
    }),
    uglify()
  ]
}
