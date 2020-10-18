import React, { useEffect, useState } from 'react'
import './PostContents.css'
import './PostHeader.css'

import PostItem from './PostItem'
import Spinner from '../layout/Spinner'

import { connect } from 'react-redux'
import { getPosts } from '../actions/post'

import { Link } from 'react-router-dom'

const PostContents = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts()
  }, [])

  const [toggle, setToggle] = useState('인기순')

  const likeOrder = (
    <div>
      {!loading &&
        [...posts]
          .sort((a, b) => b.likes.length - a.likes.length)
          .map((post) => <PostItem key={post._id} post={post} />)}
    </div>
  )

  const timeOrder = (
    <div>
      {!loading && posts.map((post) => <PostItem key={post._id} post={post} />)}
    </div>
  )

  return (
    <>
      <div className="post-header">
        <nav className="post-header__list">
          <div
            className="post-header__item"
            style={{ cursor: 'pointer' }}
            onClick={() => setToggle('인기순')}
          >
            인기순
          </div>
          <div
            className="post-header__item"
            style={{ cursor: 'pointer' }}
            onClick={() => setToggle('최신순')}
          >
            최신순
          </div>
        </nav>
        <Link to="new-post">
          <div className="btn btn-register">글쓰기</div>
        </Link>
      </div>
      <div className="post-content">
        {loading && <Spinner />}
        {toggle === '인기순' ? likeOrder : timeOrder}
      </div>
    </>
  )
}
const mapStateToProps = (state) => ({
  post: state.post,
})

export default connect(mapStateToProps, { getPosts })(PostContents)
