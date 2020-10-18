const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  age: {
    type: String,
  },
  address: {
    type: String,
  },
  job: {
    type: String,
  },
  skills: {
    type: String,
  },
  bio: {
    type: String,
  },
  img: {
    data: Buffer,
    contentType: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('profile', ProfileSchema)
