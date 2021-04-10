import { Document, model, Model, Schema, SchemaDefinition, SchemaTypes } from 'mongoose'

interface Messages extends Document {
  user: {}
  message: string
  created_at?: string
}

const schema: SchemaDefinition = {
  user: {
    type: SchemaTypes.ObjectId,
    required: true,
    ref: "user"
  },
  message: {
    type: SchemaTypes.String,
    required: true
  },
  created_at: {
    type: SchemaTypes.Date,
    default: Date.now()
  }
}

const messageSchema: Schema = new Schema(schema)

const Message: Model<Messages> =  model<Messages, Model<Messages>>('message', messageSchema)

export default Message