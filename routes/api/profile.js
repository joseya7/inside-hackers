const express = require('express')
const axios = require('axios')
const router = express.Router()
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')
const checkObjectId = require('../../middleware/checkObjectId')

const Profile = require('../../models/Profile')
const User = require('../../models/User')
// const Post = require('../../models/Post');

// @route    GET api/profile/me
// @desc     현재 로그인된 유저의 Profile 가져오기
// @access   Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['email', 'name', 'date', 'followings', 'followers'])

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' })
    }

    res.json(profile)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route    POST api/profile
// @desc     생성 or 수정 프로필
// @access   Private
router.post(
  '/',
  auth,

  async (req, res) => {
    const { age, address, job, skills, bio } = req.body

    const profileFields = {
      user: req.user.id,
      age,
      address,
      job,
      skills,
      bio,
    }

    try {
      //일치하는 것이 없다면 새로운 것을 만들기
      let profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      ).populate('user', ['email', 'name', 'date', 'followers', 'followings'])
      res.json(profile)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route    GET api/profile
// @desc     모든 프로필 가져오기
// @access   Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', [
      'email',
      'name',
      'date',
    ])
    res.json(profiles)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route    GET api/profile/user/:user_id
// @desc     ID를 통해서 프로필 가져오기(나 제외한 사람들의 프로필 보기)
// @access   Public
router.get(
  '/user/:user_id',
  checkObjectId('user_id'),
  async ({ params: { user_id } }, res) => {
    try {
      const profile = await Profile.findOne({
        user: user_id,
      }).populate('user', ['email', 'name', 'date', 'followings', 'followers'])

      if (!profile) return res.status(400).json({ msg: 'Profile not found' })

      return res.json(profile)
    } catch (err) {
      console.error(err.message)
      return res.status(500).json({ msg: 'Server error' })
    }
  }
)

// @route    DELETE api/profile
// @desc     프로필, 포스트, 유저 삭제
// @access   Private
router.delete('/', auth, async (req, res) => {
  try {
    // Remove user posts
    await Post.deleteMany({ user: req.user.id })
    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id })
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id })

    res.json({ msg: 'User deleted' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router
