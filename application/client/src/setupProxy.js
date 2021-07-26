const url = 'localhost:5000'
const { createProxyMiddleware } = require('http-proxy-middleware')
  
const wsProxy = createProxyMiddleware('/ws', { 
  target: `ws://${url}/ws`, 
  ws: true, 
  logLevel: 'debug', 
  changeOrigin: true,
})
const httpProxy = createProxyMiddleware({
  target: `http://${url}`, 
  changeOrigin: true,
})

module.exports = function(app) {
  app.use('*',(req, res, next) => {
    console.log('/', req.method, req.params, req.originalUrl, req.path, req.isSocket)
    next()
  })
  app.use('/api', httpProxy)
  app.use('/ws', wsProxy)
}