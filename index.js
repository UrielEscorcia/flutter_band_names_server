const express = require('express')
const path = require('path')
const { setupIO } = require('./sockets/socket')
require('dotenv').config()

const app = express()

const server = require('http').createServer(app)
const io = require('socket.io')(server)

setupIO(io)

const publicPath = path.resolve(__dirname, 'public')
app.use(express.static(publicPath))

server.listen(process.env.PORT, (err) => {
    if (err) throw new Error(err)

    console.log(`Server is running on port: ${process.env.PORT}`)
})
