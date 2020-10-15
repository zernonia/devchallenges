// import { router as catRouter } from './router'
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const catRouter = require('./router')

const app = express()
const uri = process.env.MONGO_URL
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

mongoose.connect(
  uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) console.log('Error connecting to DB')
    else console.log('Connected to DB')
  }
)
app.use('/', catRouter)

module.exports = {
  path: 'api',
  handler: app,
}
