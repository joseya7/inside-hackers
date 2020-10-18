const mongoose = require('mongoose')
// ID가 Mongoose의 ID형태인지 체킹하기.
const checkObjectId = (idToCheck) => (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params[idToCheck]))
    return res.status(400).json({ msg: 'Invalid ID' })
  next()
}

module.exports = checkObjectId
