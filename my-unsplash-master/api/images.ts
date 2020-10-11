import { NowRequest, NowResponse } from '@vercel/node'
import cloudinary from './cloudinary'
import ImageModel, { Image } from './database/model'
import { getConnection } from './database/index'
import mongoose from 'mongoose'

export default async (request: NowRequest, response: NowResponse) => {
  const dbConn = await getConnection()
  const Image: mongoose.Model<Image> = ImageModel(dbConn)

  cloudinary.api.resources( 
    { type: 'upload', prefix: 'DevChallenge' },
    (err, result) => {
      if(err) response.status(400).send(err)
      if(result) {
        let temp = []
        for(let i = 0; i < result.resources.length ; i++) { 
          const item = result.resources[i]
          const image: Image = new Image({
            public_id: item.public_id,
            url: item.url,
            password: "devchallenge",
            created_at: item.created_at
          })
          image.save().then( res => temp.push(item)).catch(e => console.log(e))
          
        }
        if(temp.length === result.resources.length) response.status(200).json(result)
      }
    })
}