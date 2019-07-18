var path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        img: resolve('public/images')
      }
    },
    output: {
      libraryExport: 'default'
    }
  },
  css: {
    extract: false
  }
}
