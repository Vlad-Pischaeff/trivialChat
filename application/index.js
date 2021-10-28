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

const PORT = config.get('port') || 5001
const MONGO_URL = config.get('mongoUrl')
const User = require('./models/User')

const isProduction = process.env.NODE_ENV === 'production'
                      ? true
                      : false
const Server = isProduction
                ? https.createServer(credentials, app)
                : http.createServer(app)

const clients = {}
let wsClients = new WeakMap()
let countedSites = {}
let countedEmails = {}
const emitter = require('./routes/service')

app.use(express.json({ extended: true }))
app.use(cors())

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

    emitter.on('get users', getUsers)
    emitter.emit('get users')

    wss = new WebSocket.Server({ server, path: '/ws' })
    
    wss.on('connection', (ws, req) => {

    /* parse url ws://host:port/ws?param=value ************ */
    /* let parse url 'ws:/localhost:5000/ws?userName=vlad' */

      let params = parser(`${req.headers.origin}${req.url}`, true)
      console.log('websocket app started...', params.query.userName, req.url, req.headers['sec-websocket-key'], req.headers.origin)
      let { hostname, query } = params
      console.log('params...', hostname, query)
    /* end parse url *************************************** */

      ws.isAlive = true
      clients[query.userName] = ws
      wsClients.set(ws, query.userName)

      ws.on('message', message => {
        try {
          let data = JSON.parse(message)
          // data.from = message from client to site manager
          // data.to - message to client from site manager
          // console.log(' received: \t \t', message, '\n clients size...\t', wss.clients.size, '\n to...\t \t', countedSites[query.userHost])
          if (data.from && countedSites[query.userHost]) {
            let destination = countedSites[query.userHost]    // equal to query.userName
            // wss.clients.forEach(ws => console.log('wss clients...', wsClients.get(clients[destination])))
            // console.log(' destination...\t', destination, '\n query.userHost... \t', query.userHost)
            // console.log(' send...\t \t', wsClients.get(clients[destination]))
            clients[destination] && clients[destination].send(JSON.stringify(data))
          }
          if (data.to) {
            clients[data.to].send(JSON.stringify(data))
          }
        } catch(e) {
          console.log('Error while received WebSocket message ... ', e, message)
        }
      })
    
      ws.on('pong', () => {
        ws.isAlive = true
        // console.log('isAlive...', query.userName, ws.isAlive,`${new Date()}`)
      })
    })
    
    // ...preserve constant clients connections...
    setInterval(() => {
      wss.clients.forEach(ws => {
        // if (!ws.isAlive) return ws.terminate()
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
    countedSites = users.reduce((allNames, name) => {
      allNames[name.site] = name.email
      return allNames
    }, {})
    countedEmails = users.reduce((allNames, name) => {
      allNames[name.email] = name.site
      return allNames
    }, {})
    console.log('emitter on GET USERS ...\n', 'countedSites...\t \n', countedSites, '\n countedEmails...\t', countedEmails)
    // return { countedSites, countedEmails }
  } catch(e) {
    console.log('getUsers error ...', e)
  }
}