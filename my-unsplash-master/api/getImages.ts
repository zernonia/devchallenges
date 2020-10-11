import { NowRequest, NowResponse } from '@vercel/node'
import { getConnection } from './database/index'
import ImageModel, { Image } from './database/model'
import mongoose from 'mongoose'

export default async (request: NowRequest, response: NowResponse) => {
  const dbConn = await getConnection()
  const Image: mongoose.Model<Image> = ImageModel(dbConn)
  Image.find().select('-password -__v').then( res => {
    response.status(200).json(res)
  }).catch(err => {
    response.status(400).send(err)
  })
}