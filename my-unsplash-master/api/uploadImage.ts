import { NowRequest, NowResponse } from '@vercel/node'
import cloudinary from './cloudinary'
import ImageModel, { Image } from './database/model'
import { getConnection } from './database/index'
import mongoose from 'mongoose'

export default (request: NowRequest, response: NowResponse) => {
  const { body } = request
  const { file, password, label } = body

  cloudinary.uploader.unsigned_upload( 
    file ,
    process.env.CLOUDINARY_PRESET,
    async (err, result) => {
      if(err) response.status(400).send(err)
      if(result) {
        const dbConn = await getConnection()
        const Image: mongoose.Model<Image> = ImageModel(dbConn)
        const image: Image = new Image({
          public_id: result.public_id,
          url: result.url,
          password,
          created_at: result.created_at,
          label
        })
        image.save().then( res => {
          response.status(200).json(res)
        }).catch(err => {
          response.status(400).send(err)
        })
      }
  })
}