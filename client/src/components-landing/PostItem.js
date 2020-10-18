import React from 'react'
import Avatar from 'react-avatar'
import './PostItem.css'

import ExpandLessIcon from '@material-ui/icons/ExpandLess'

import { addLike } from '../actions/post'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'

import Moment from 'react-moment'
import 'moment/locale/ko'

const PostItem = ({
  post: { _id, name, title, text, date, comments, likes, user },
  addLike,
}) => {
  return (
    <>
      <div className="post-item">
        <Link to={`/get-profile/${user}`}>
          <Avatar name={name} className="post-item__avatar" />
        </Link>
        <div className="post-item__like">
          <div className="post-item__icon">
            <ExpandLessIcon
              style={{ cursor: 'pointer' }}
              onClick={() => addLike(_id)}
            />
          </div>
          <span className="post-item__like-number">{likes.length}</span>
        </div>
        <div className="post-item__contents">
          <Link to={`/read-post/${_id}`} style={{ color: '#9cb3c9' }}>
            <h2 className="post-item__header">{title}</h2>
          </Link>
          <div className="post-item__content">
            <Link to={`/get-profile/${user}`} className="no-link">
              <span className="post-item__user-name">{name}</span>
              <span>님이</span>
            </Link>{' '}
            <Moment locale="ko" fromNow className="attached">
              {date}
            </Moment>
            <span>에 작성하셨습니다</span>
            {/* <h3 className="post-item__time"></h3> */}
            <strong>·</strong>{' '}
            <h3 className="post-item__replies">{comments.length} comments</h3>
          </div>
        </div>
      </div>
    </>
  )
}

export default connect(null, { addLike })(PostItem)
