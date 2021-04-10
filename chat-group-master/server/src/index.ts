import express from 'express';
import socket, { Namespace, Socket } from 'socket.io'
import http from 'http'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import * as dotenv from 'dotenv'
import cors from 'cors'

import { userRouter, channelRouter } from './routes/index'
import { onConnect } from './socket/index'


const app = express();
dotenv.config()

app.use(express.json());
app.use(cookieParser())
app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true,
}))

mongoose.connect( process.env.MONGO_URI as string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}, (err) => {
  if (err) console.log('Error connecting to DB')
  else console.log('Connected to DB')
})

const server = http.createServer(app)
const io = socket(server)
const nspChannel = io.of('/channel')

nspChannel.on('connection', onConnect)


app.use('/users', userRouter) 
app.use('/channels', channelRouter )

server.listen(3000, () => {
    console.log(`Server is listening on port 3000`);
});