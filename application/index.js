const express = require('express')
const app = express()
const cors = require('cors')
const fs = require('fs')
const config = require('config')
const http = require('http')
const https = require('https')
const WebSocket = require('ws')
const path = require('path')
const mongoose = require('mongoose')
const parser = require('url-parse')

const privateKey  = fs.readFileSync('./keys/privkey.pem', 'utf8')
const certificate = fs.readFileSync('./keys/cert.pem', 'utf8')
const credentials = {key: privateKey, cert: certificate}

const PORT = config.get('port') || 5000
const MONGO_URL = config.get('mongoUrl')
const User = require('./models/User')

const isProduction = process.env.NODE_ENV === 'production'
                      ? true
                      : false
const Server = isProduction
                ? https.createServer(credentials, app)
                : http.createServer(app)

const clients = {}

app.use(express.json({ extended: true }))
app.use(cors())

// app.get('*', (req, res, next) => {
  // console.log('REQ...', req.method, req.params, req.originalUrl, req.path, req.isSocket)
//   let uri = req.originalUrl.split('/')
//   console.log('PATH...', req.originalUrl, uri)
//   res.sendFile(path.join(__dirname, 'img5.jpg'))
//   next()
// })

app.use('/img', express.static(path.join(__dirname, 'img' )))
app.use('/fonts', express.static(path.join(__dirname, 'fonts' )))
app.use('/css', express.static(path.join(__dirname, 'css' )))
app.use('/js', express.static(path.join(__dirname, 'js' )))
app.get('/tchat', (req, res) => {
    console.log('tchat req...', 'to ...', req.headers.host, 'from ...', req.headers.referer, req.url, req.originalUrl)
    res.sendFile(path.resolve(__dirname, 'tchat', 'main.html'))
  }
)

app.use('/api/auth', require('./routes/auth.routes'))
// app.use('/api/room', require('./routes/room.routes'))
// app.use('/api/message', require('./routes/message.routes'))
// app.use('/api/notification', require('./routes/notification.routes'))

if (isProduction) {
  app.use('/', express.static(path.join(__dirname, 'client', 'build', )))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const start = async () => {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    })

    const server = await Server.listen(PORT, () => {
        console.log('http/https server started ...')
    })

    const { countedSites, countedEmails } = await getUsers()

    wss = new WebSocket.Server({ server, path: '/ws' })
    
    wss.on('connection', (ws, req) => {

    /* parse url ws://host:port/ws?param=value ************ */
    /* let parse url 'ws:/localhost:5000/ws?userName=vlad' */

      let params = parser(`${req.headers.origin}${req.url}`, true)
      console.log('websocket app started...', params.query.userName, req.url, req.headers['sec-websocket-key'], req.headers.origin)
      let { hostname, query } = params
      // console.log('params...', hostname, query)
    /* end parse url *************************************** */

      ws.isAlive = true
      clients[query.userName] = ws
      // console.log('clients...', clients)

      ws.on('message', message => {
        // console.log('received1: ...', JSON.parse(message))
        try {
          let data = JSON.parse(message)
          console.log('received2: %s', message, wss.clients.size, hostname, countedSites[hostname])
          if (data.from && countedSites[hostname]) {
            let destination = countedSites[hostname]
            console.log('destination...', destination)
            clients[destination].send(JSON.stringify(data))
          }
          if (data.to) {
            clients[data.to].send(JSON.stringify(data))
          }
        } catch(e) {
          console.log('Error while received WebSocket message ... ', message)
        }
      })
    
      ws.on('pong', () => {
        ws.isAlive = true
        console.log('isAlive', ws.isAlive,`${new Date()}`)
      })
    })
    
    // ...preserve constant clients connections...
    setInterval(() => {
      wss.clients.forEach(ws => {
        if (!ws.isAlive) return ws.terminate()
        ws.isAlive = false
        ws.ping()
      })
    }, 10000)

  } catch (e) {
    console.log('Server error ...', e)
    process.exit(1)
  }
}

start()

const getUsers = async () => {
  try {
    const users = await User.find({})
    let countedSites = users.reduce((allNames, name) => {
      allNames[name.site] = name.email
      return allNames
    }, {})
    let countedEmails = users.reduce((allNames, name) => {
      allNames[name.email] = name.site
      return allNames
    }, {})
    return { countedSites, countedEmails }
  } catch(e) {
    console.log('getUsers error ...', e)
  }
}