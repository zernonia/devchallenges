const mongoose = require('mongoose')

const schema = {
  breed_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
}

const collectionName = 'Search'
const searchSchema = new mongoose.Schema(schema)

module.exports = mongoose.model(collectionName, searchSchema)
