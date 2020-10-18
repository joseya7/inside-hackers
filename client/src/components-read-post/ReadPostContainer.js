import React, { useEffect, useState } from 'react'
import './ReadPostContainer.css'

// SVG Social Media Icons
import FacebookIcon from '@material-ui/icons/Facebook'
import TwitterIcon from '@material-ui/icons/Twitter'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import CheckIcon from '@material-ui/icons/Check'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'

//
import { Link } from 'react-router-dom'

import ReadPostComment from './ReadPostComment'
import Spinner from '../layout/Spinner'

import Moment from 'react-moment'
import Avatar from 'react-avatar'

import { connect } from 'react-redux'
import {
  getPost,
  addComment,
  addLike,
  removeLikeInReading,
  addLikeInReading,
} from '../actions/post'
import { followUser } from '../actions/user'

const ReadPostContainer = ({
  post: { post, loading },
  auth,
  getPost,
  match,
  addComment,
  addLikeInReading,
  removeLikeInReading,
  followUser,
}) => {
  useEffect(() => {
    getPost(match.params.id)
  }, [])

  const [text, setText] = useState('')

  if (loading) {
    return <Spinner className="padding-high" />
  }

  return (
    <>
      {!loading && post && (
        <div className="read-post-container">
          <div className="read-post__sharing-wrapper">
            <div className="read-post__share-bar">
              {auth && !auth.isAuthenticated ? (
                <Link to="/login">
                  <div className="read-post__like-box">
                    <ExpandLessIcon />
                  </div>
                </Link>
              ) : post.likes.some((like) => like.user === auth.user._id) ? (
                <div
                  className="read-post__unlike-box"
                  onClick={() => removeLikeInReading(post._id)}
                  style={{ cursor: 'pointer' }}
                >
                  <CheckIcon onClick={() => removeLikeInReading(post._id)} />
                </div>
              ) : (
                <div
                  className="read-post__like-box"
                  onClick={() => addLikeInReading(post._id)}
                  style={{ cursor: 'pointer' }}
                >
                  <ExpandLessIcon onClick={() => addLikeInReading(post._id)} />
                </div>
              )}

              <div className="read-post__like-text">
                {post.likes.length}
                <span>votes</span>
              </div>

              <div className="read-post__social-box">
                <FacebookIcon className="read-post__icons" />
                <TwitterIcon className="read-post__icons" />
                <LinkedInIcon className="read-post__icons" />
              </div>
            </div>
          </div>

          <div className="read-post__header">
            <h4 className="read-post__header-date">
              {<Moment format="YYYY-MM-DD">{post.date}</Moment>}
            </h4>
            <h2 className="read-post__header-title">{post.title}</h2>
          </div>
          <div className="read-post__user">
            <Link
              to={`/get-profile/${post.user}`}
              className="read-post__profile-link"
            >
              <Avatar name={post.name} className="read-post__user-avatar" />

              <span className="read-post__user-name">{post.name}</span>
              <span className="read-post__user-id">
                @{post.email.substring(0, post.email.indexOf('@'))}
              </span>
            </Link>
            {auth.isAuthenticated && (
              <button
                className="read-post__follow-button"
                onClick={() => followUser(post.user)}
              >
                Follow
              </button>
            )}
          </div>
          <span style={{ whiteSpace: 'pre-line' }} className="read-post__main">
            {post.text}
          </span>
          <div className="read-post__comments">
            <form
              className="read-post__input-wrapper"
              onSubmit={(e) => {
                e.preventDefault()
                addComment(post._id, { text })
                setText('')
              }}
            >
              <textarea
                name="text"
                id=""
                cols="30"
                rows="5"
                className="read-post__input"
                placeholder="댓글을 남겨주세요"
                spellCheck="false"
                value={text}
                onChange={(e) => setText(e.target.value)}
              ></textarea>
              <input
                className="btn btn-register read-post__comment-button"
                type="submit"
                value="댓글 달기"
              />
            </form>
            <div className="read-post__comments-list">
              {!loading &&
                post &&
                post.comments.map((comment) => (
                  <ReadPostComment key={comment._id} comment={comment} />
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
})

export default connect(mapStateToProps, {
  getPost,
  addComment,
  addLike,
  addLikeInReading,
  removeLikeInReading,
  followUser,
})(ReadPostContainer)
