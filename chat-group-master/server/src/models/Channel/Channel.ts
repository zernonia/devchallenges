import { Document, Model, model, Schema, SchemaDefinition, SchemaTypes } from 'mongoose'

interface Channel extends Document {
  admin?: []
  description: string
  name: string
  message?: []
  user?: []
}

const schema: SchemaDefinition = {
  admin: [{
    type: SchemaTypes.ObjectId,
    ref: 'user'
  }],
  description: {
    type: SchemaTypes.String,
  },
  name: {
    type: SchemaTypes.String,
    required: true,
    lowercase: true,
    unique: true
  },
  message: [{
    type: SchemaTypes.ObjectId,
    ref: 'message'
  }],
  user: [{
    type: SchemaTypes.ObjectId,
    ref: 'user'
  }],
}

const channelSchema: Schema = new Schema(schema)

const Channel: Model<Channel> = model<Channel, Model<Channel>>('channel', channelSchema)

export default Channel 