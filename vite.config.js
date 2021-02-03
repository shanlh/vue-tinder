import vue from '@vitejs/plugin-vue'
var path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

/**
 * https://vitejs.dev/config/
 * @type {import('vite').UserConfig}
 */
export default {
  server: { port: 8080 },
  alias: [{ find: '@', replacement: resolve('src') }],
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve('/src/components/index.js'),
      name: 'vue-tinder'
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        dir: 'lib',
        globals: { vue: 'Vue' }
      }
    }
  }
}
