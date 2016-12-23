var path = require('path')
var express = require('express')
var webpack = require('webpack')
var config = require('../config')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')
var io = require('socket.io')(1234)
var matlabServer = io.of('/matlab')
var webClient = io.of('/client')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
})

var hotMiddleware = require('webpack-hot-middleware')(compiler)
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  app.use(proxyMiddleware(context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error displaykjl
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.build.assetsPublicPath, config.build.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('[Web] Listening at http://localhost:' + port)
})

// Socket.io communication between server and client
console.log('[Socket] Listening at http://localhost:1234')

matlabServer.on('connection', function (socket) {
    socket.on('fromMatlab', function (data) {
        console.log('[Socket] Matlab saying:', data)
        webClient.emit('fromMatlab', data)
    })
})

webClient.on('connection', function (socket) {
    socket.on('toMatlab', function (from, msg) {
        console.log('[Socket]', from, 'saying:', msg)
        matlabServer.emit('toMatlab', from + ' saying: ' + msg)
    })
})

io.on('connection', function (socket) {
    console.log('[Socket] user connected: ' + socket.id)
    socket.on('disconnect', function () {
        console.log('[Socket] user disconnected: ' + socket.id)
    })
})

