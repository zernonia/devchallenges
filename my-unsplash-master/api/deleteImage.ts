import { NowRequest, NowResponse } from '@vercel/node'
import cloudinary from './cloudinary'
import ImageModel, { Image } from './database/model'
import { getConnection } from './database/index'
import mongoose from 'mongoose'

export default async (request: NowRequest, response: NowResponse) => {
  const { body } = request
  const { _id , password } = body

  const dbConn = await getConnection()
  const Image: mongoose.Model<Image> = ImageModel(dbConn)
  
  Image.findById(_id)
    .then( (res: Image) => {
      if (res.password === password) {
        res.deleteOne()
          .then( (res2: Image) => {
            cloudinary.api.delete_resources(
              [ res2.public_id ] ,
              (err, result) => {
                if(err) response.status(400).send(err)
                if(result) response.status(200).json(result)
            })
          .catch(e => response.status(400).send(e))
        })
      }
      else response.status(401).send("Wrong password")
    })
    .catch(e => response.status(400).send(e))
}