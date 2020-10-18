import React from 'react'
import './ProfilePostItem.css'

import FavoriteIcon from '@material-ui/icons/Favorite'
import MessageIcon from '@material-ui/icons/Message'

import { truncate } from '../helper-functions/general'
import { Link } from 'react-router-dom'

import Moment from 'react-moment'

const ProfilePostItem = ({ post }) => {
  return (
    <Link to={`/read-post/${post._id}`}>
      <div className="profile-post-item">
        <div className="profile-post-item__header">
          <Moment
            style={{ marginRight: '10px', color: '#6f8aa5' }}
            format="YYYY-MM-DD"
          >
            {post.date}
          </Moment>
          <h3>
            <FavoriteIcon className="profile-post-item__icons" />{' '}
            {post.likes.length}
          </h3>
          <h3>
            <MessageIcon /> {post.comments.length}
          </h3>
        </div>
        <div className="profile-post-item__title">{post.title}</div>
        <div className="profile-post-item__contents">
          {truncate(post.text, 300)}
        </div>
      </div>
    </Link>
  )
}

export default ProfilePostItem
