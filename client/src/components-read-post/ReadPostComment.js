import React from 'react'
import './ReadPostComment.css'

import Avatar from 'react-avatar'

import Moment from 'react-moment'
import 'moment/locale/ko'
import { Link } from 'react-router-dom'

const ReadPostComment = ({ comment }) => {
  return (
    <>
      <div className="comment">
        <div className="comment__user">
          <Link to={`/get-profile/${comment.user}`} className="no-link flex">
            <Avatar name={comment.name} className="comment__user-avatar" />
            <h5 className="comment__user-id">{comment.name}</h5>
          </Link>
          <Moment locale="ko" fromNow className="comment__user-time">
            {comment.date}
          </Moment>
        </div>
        <p className="comment__content">{comment.text}</p>
      </div>
    </>
  )
}

export default ReadPostComment
