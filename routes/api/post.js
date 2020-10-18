const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const auth = require('../../middleware/auth')

const Post = require('../../models/Post')
const User = require('../../models/User')
const checkObjectId = require('../../middleware/checkObjectId')

// @route    POST api/post
// @desc     글 생성하기
// @access   Private
router.post(
  '/',
  [
    auth,
    [check('text', '내용을 작성해주세요').not().isEmpty()],
    [check('title', '제목을 작성해주세요').not().isEmpty()],
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const user = await User.findById(req.user.id).select('-password')

      const newPost = new Post({
        title: req.body.title,
        text: req.body.text,
        name: user.name,
        email: user.email,
        user: req.user.id,
      })

      const post = await newPost.save()

      res.json(post)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route    GET api/post
// @desc     모든 글 가져오기(시간순)
// @access   Public
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 })
    res.json(posts)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route    GET api/post
// @desc     모든 글 가져오기(좋아요순)
// @access   Public
router.get('/likes-order', async (req, res) => {
  try {
    const posts = await Post.find()
    posts.sort((a, b) => b.likes.length - a.likes.length)
    res.json(posts)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route    GET api/post/:id
// @desc     포스트 가져오기(Id로)
// @access   Public
router.get('/:id', [checkObjectId('id')], async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' })
    }

    res.json(post)
  } catch (err) {
    console.error(err.message)

    res.status(500).send('Server Error')
  }
})

// @route    GET api/post/:userid
// @desc     포스트 가져오기(UserId로)
// @access   Public
router.get('/user/:id', [checkObjectId('id')], async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.id }).sort({ date: -1 })
    if (!posts) {
      return res.status(404).json({ msg: 'Post not found' })
    }

    res.json(posts)
  } catch (err) {
    console.error(err.message)

    res.status(500).send('Server Error')
  }
})

// @route    POST api/post/comment/:id
// @desc     코멘트 올리기
// @access   Private
router.post(
  '/comment/:id',
  [
    auth,
    checkObjectId('id'),
    [check('text', '글을 작성하셔야합니다').not().isEmpty()],
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const user = await User.findById(req.user.id).select('-password')
      const post = await Post.findById(req.params.id)

      const newComment = {
        text: req.body.text,
        name: user.name,
        user: req.user.id,
      }

      post.comments.unshift(newComment)

      await post.save()

      res.json(post.comments)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route    DELETE api/post/comment/:id/:comment_id
// @desc     코멘트 지우기
// @access   Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    // 글에서 코멘트 가져오기
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    )
    // 코멘트 존재 여부 확인
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' })
    }
    // 코멘트를 쓴 사람이 로그인한 유저인지 확인
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' })
    }

    post.comments = post.comments.filter(
      ({ id }) => id !== req.params.comment_id
    )

    await post.save()

    return res.json(post.comments)
  } catch (err) {
    console.error(err.message)
    return res.status(500).send('Server Error')
  }
})

// @route    PUT api/post/like/:id
// @desc     좋아요
// @access   Private
router.put('/like/:id', [auth, checkObjectId('id')], async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    // 이미 좋아요를 1번 눌렀는지 확인하기
    if (post.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: '이미 좋아요를 1번 눌러주셨습니다' })
    }

    post.likes.unshift({ user: req.user.id })

    await post.save()

    return res.json(post.likes)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route    PUT api/post/unlike/:id
// @desc     싫어요
// @access   Private
router.put('/unlike/:id', [auth, checkObjectId('id')], async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    // 좋아요를 한적이 있는지 확인하기
    if (!post.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: '좋아요를 누른적이 없어요!' })
    }

    // 좋아요 내리기
    post.likes = post.likes.filter(
      ({ user }) => user.toString() !== req.user.id
    )

    await post.save()

    return res.json(post.likes)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router
