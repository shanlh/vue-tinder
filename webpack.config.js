const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  mode: 'development',
  devServer: {
    port: '8000',
    host: '0.0.0.0'
  },
  entry: {
    'vue-tinder': './src/index.js'
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js',
    publicPath: '/',
    library: 'VueTinder',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.min.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          postcss: [require('autoprefixer')]
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {minified: true}
      },
      {
        test: /\.css/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}

if (process.env.NODE_ENV !== 'production') {
  exports.plugins = [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './example/index.html',
      inject: false
    })
  ]
  exports.devtool = '#cheap-module-eval-source-map'
}
