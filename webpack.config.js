const { basename, dirname, join, resolve } = require('path')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const IgnoreEmitPlugin = require('ignore-emit-webpack-plugin')

module.exports = (env, { mode }) => {
  // module.exports is now a function that receives two arguments
  const isProduction = mode === 'production' // Define isProduction here

  return {
    entry: {
      bundle: resolve(__dirname, 'src', 'js', 'index.js'),
      styles: resolve(__dirname, 'src', 'styles', 'scss', 'index.scss'),
    },
    output: {
      path: isProduction
        ? resolve(__dirname, 'dist')
        : resolve(__dirname, '.serve'),
      filename: '[name].js',
      clean: true, // clean the dist folder before building
    },

    module: {
      rules: [
        {
          test: /\.scss$/i, // load scss files if they are imported in JS files
          // Loaders are applied from right to left (last to first configured)
          use: [
            MiniCssExtractPlugin.loader, // extract CSS into separate files
            'css-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          use: [
            {
              loader: 'file-loader', // copy the images to the output folder
              options: {
                name: '[name].[ext]',
                outputPath: 'img',
              },
            },
          ],
        },
        {
          test: /\.js?x|ts?x$/i,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'], // convert modern JS to ES5
            },
          },
        },
      ],
    },

    plugins: [
      new IgnoreEmitPlugin(/styles.*\.js$/), // ignore the styles.*.js files

      ...glob.sync('./src/**/*.html').map((filePath) => {
        const parentDir = dirname(filePath).split('/').pop()
        const filename =
          basename(filePath) === 'index.html'
            ? 'index.html'
            : `${parentDir}/${basename(filePath)}`
        return new HtmlWebpackPlugin({
          filename,
          template: filePath,
          inject: filename === 'index.html', // inject the bundle.js file only in index.html
        })
      }),

      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),

      new CopyPlugin({
        patterns: [{ from: 'src/img', to: 'img' }],
      }),
    ],

    // create source maps for debugging only in development
    devtool: isProduction ? false : 'source-map',

    devServer: {
      static: {
        directory: join(__dirname, '.serve'),
      },
      devMiddleware: {
        writeToDisk: !isProduction,
      },
      port: 3000,
      open: true,
      hot: true,
      compress: true,
      historyApiFallback: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
  } // end of return
} // end of module.exports
