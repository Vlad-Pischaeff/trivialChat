const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  title: { type: String },
  desc: { type: String },
  greeting: { type: String },
  answer: { type: Array, default: ['', '', ''] },
  site: { type: String },
  avatar: { type: String },
})

module.exports = model('User', schema)