import { response } from "express";
import { isValidObjectId } from "mongoose";
import { Namespace, Socket } from "socket.io"
import { Channel, Message } from '../models/index'

const populate = {
  path: "message",
  populate: {
    path: "user",
    select: "name photo"
  }
}

export const onConnect = (socket: Socket) => {
  const hs = socket.handshake
  console.log(hs.query);
  // console.log(socket);
  

  const roomId: string = hs.query.room
  let currentRoom: string
  
  socket.join(`${ roomId }`, async () => {
    currentRoom = Object.keys(socket.rooms)[1] 
    const channel = await Channel.findOne({ name: roomId }).populate( populate )
    socket.emit('fetch data', channel)
    console.log(`someone connected to ${ currentRoom }`);
  })

  socket.on('switch room', (newRoom: string) => {
    const oldRoom = currentRoom
    currentRoom ? socket.leave(currentRoom) : ''

    socket.join(`${ newRoom }`, () => {
      currentRoom = Object.keys(socket.rooms)[1] 
      console.log(`someone changed to ${ currentRoom }`);
    })
    socket.emit('updateRoom', oldRoom, currentRoom)
  })

  socket.on('message', async(msg: string, id: string) => {
    try {
      const message = await Message.create({
        user: id,
        message: msg
      })
      const data = {
        $push: {
          message: message._id
        }
      }
      const channel = await Channel.findOneAndUpdate({ name: currentRoom }, data, {new: true} ).populate( populate )
      socket.nsp.emit('messageFromServer', channel)
    } catch (err) {
      socket.error('Problem adding message')
    }
  })

  socket.on('disconnect', (e) => {
    console.log('someone  disconnect from channel');
  })
}