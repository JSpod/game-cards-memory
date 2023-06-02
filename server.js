// server.js
const WebpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')
const configFn = require('./webpack.config.js')
const path = require('path')
const fs = require('fs')

const args = process.argv.slice(2)
const modeArg = args.find((arg) => arg.startsWith('--mode='))

let mode = 'development' // default value
if (modeArg) {
  mode = modeArg.split('=')[1]
}

// Set the mode directly in the configuration object
const config = configFn({}, { mode })
config.mode = mode

const compiler = webpack(config)

const server = new WebpackDevServer(
  {
    ...config.devServer,
    onAfterSetupMiddleware: (devServer) => {
      process.on('SIGINT', () => {
        console.log('Removing .serve directory...')
        fs.rmdirSync(path.join(__dirname, '.serve'), { recursive: true })
        console.log('.serve directory removed. Exiting process...')
        process.exit()
      })
    },
  },
  compiler
)

server.startCallback(() => {
  console.log(
    '\x1b[38;5;202m%s\x1b[0m',
    'WebpackDevServer is now started in ' + mode + ' mode...'
  )
})
