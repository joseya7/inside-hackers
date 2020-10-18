const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  followers: [
    {
      user: {
        type: Schema.Types.ObjectId,
      },
      name: {
        type: String,
      },
    },
  ],
  followings: [
    {
      user: {
        type: Schema.Types.ObjectId,
      },
      name: {
        type: String,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('user', UserSchema)
