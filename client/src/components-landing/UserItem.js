import React from 'react'
import './UserItem.css'

import Avatar from 'react-avatar'

import { Link } from 'react-router-dom'

const UserItem = ({ user }) => {
  return (
    <>
      <div className="user-item">
        <Link to={`/get-profile/${user._id}`} className="no-link">
          <div className="user-item__left">
            {' '}
            <Avatar name={user.name} className="user-item__avatar" />
            <h2 className="user-item__user-name">{user.name}</h2>
          </div>
        </Link>
        <div className="user-item__followers-box">
          <p className="user-item__followers-tag">팔로워</p>
          <h3 className="user-item__followers-number">
            {user.followers.length}
          </h3>
        </div>
      </div>
    </>
  )
}

export default UserItem
