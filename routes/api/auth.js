const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const auth = require('../../middleware/auth')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')

const User = require('../../models/User')

// @route    GET api/auth
// @desc     토큰과 함께 유저 정보 가져오기
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route    POST api/auth
// @desc     로그인
// @access   Public
router.post(
  '/',
  [
    check('email', '적합한 이메일 형식을 입력해주세요').isEmail(),
    check('password', '비밀번호를 입력해주세요').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    try {
      let user = await User.findOne({ email })

      if (!user) {
        return res.status(400).json({
          errors: { msg: '이메일이나 비밀번호가 일치하지 않습니다.' },
        })
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res.status(400).json({
          errors: { msg: '이메일이나 비밀번호가 일치하지 않습니다.' },
        })
      }

      const payload = {
        user: {
          id: user.id,
        },
      }

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) throw err
          res.json({ token })
        }
      )
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error')
    }
  }
)

module.exports = router
