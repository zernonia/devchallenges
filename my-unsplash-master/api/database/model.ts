import { Document, SchemaDefinition, SchemaTypes, Schema, Connection, Model } from "mongoose"

export interface Image extends Document {
  public_id: string,
  url: string,
  password: string,
  created_at: Date,
  label: string,
}

const schema: SchemaDefinition = {
  public_id: {
    type: SchemaTypes.String,
    required: true
  },
  url: {
    type: SchemaTypes.String,
    required: true
  },
  password: {
    type: SchemaTypes.String,
    required: true
  },
  created_at: {
    type: SchemaTypes.Date,
    required: true
  },
  label: {
    type: SchemaTypes.String,
    required: true
  }
}

const collectionName: string = "image"
const imageSchema: Schema = new Schema(schema)

const Image = (conn: Connection): Model<Image> => {
  return conn.model(collectionName, imageSchema)
}

export default Image;