const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const auth = require('../../middleware/auth')
const checkObjectId = require('../../middleware/checkObjectId')

const User = require('../../models/User')

// @route    POST api/users
// @desc     회원가입
// @access   Public
router.post(
  '/',
  [
    check('name', '이름을 입력해주세요').not().isEmpty(),
    check('email', '이메일 형식에 맞지 않습니다.').isEmail(),
    check('password', '비밀번호는 최소한 6글자 이상을 입력해주세요').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req)

    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() })
    // }

    const { name, email, password } = req.body

    try {
      let user = await User.findOne({ email })

      if (user) {
        return res
          .status(400)
          .json({ errors: { msg: '이미존재하는 회원입니다' } })
      }

      user = new User({
        name,
        email,
        password,
      })

      const salt = await bcrypt.genSalt(10)

      user.password = await bcrypt.hash(password, salt)

      await user.save()

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

// @route    GET api/users/top-5/
// @desc     팔로우가 많은 상위 5명의 유저들 가져오기
// @access   Public
router.get('/top-5', async (req, res) => {
  try {
    const users = await User.find()
    const topFiveUsers = [...users]
      .sort((a, b) => b.followers.length - a.followers.length)
      .slice(0, 5)

    res.json(topFiveUsers)
  } catch (err) {
    res.status(500).send('Server Error')
  }
})

// @route    PUT api/users/follow/:id(팔로우를 하는 상대의 id)
// @desc     원하는 유저를 팔로우 하고, 원하는 유저의 팔로우리스트에 자기 id를 넣는다.
// @access   Private
router.put('/follow/:id', [auth, checkObjectId('id')], async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    const userFollowing = await User.findById(req.user.id)

    console.log(user)

    // 이미 팔로우를 한번했는지 확인하기
    if (
      user.followers.some(
        (follower) => follower.user.toString() === req.user.id
      )
    ) {
      return res.status(400).json({ msg: '이미 팔로우를 1번 하셨습니다.' })
    }

    user.followers.unshift({ user: req.user.id, name: userFollowing.name })

    await user.save()

    return res.json(user.followers)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route    PUT api/user/follow/in-my-list/:id(팔로우를 하는 상대의 id)
// @desc     원하는 유저를 팔로우 하고, 내 팔로윙 리스트에 그 유저를 넣는다.
// @access   Private
router.put(
  '/follow/in-my-list/:id',
  [auth, checkObjectId('id')],
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id)
      const userFollowed = await User.findById(req.params.id)

      // 이미 팔로우를 한번했는지 확인하기
      if (
        user.followings.some(
          (following) => following.user.toString() === req.params.id
        )
      ) {
        return res.status(400).json({ msg: '이미 팔로우를 1번 하셨습니다.' })
      }

      user.followings.unshift({ user: req.params.id, name: userFollowed.name })

      await user.save()

      return res.json(user.followings)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

module.exports = router
