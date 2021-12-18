import * as dotenv from 'dotenv'
dotenv.config({ path: process.env.PWD + '/.env' })

import connectDB from './db/connectDB'
import express from 'express'
import api from './api'

connectDB()

const app = express()

app.use('/api', api)

const port = process.env.PORT || 5500

const server = app.listen(port, () => {
  console.log(`1: Listening on port ${port}`)
})

server.on('error', (err) => console.error(err))
