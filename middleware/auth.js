const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  // 헤더에서 토큰가져오기
  const token = req.header('x-auth-token')

  // 토큰 여부 체킹
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' })
  }

  // 토큰 인증 과정
  try {
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        return res.status(401).json({ msg: 'Token is not valid' })
      } else {
        req.user = decoded.user
        next()
      }
    })
  } catch (err) {
    console.error('something wrong with auth middleware')
    res.status(500).json({ msg: 'Server Error' })
  }
}
