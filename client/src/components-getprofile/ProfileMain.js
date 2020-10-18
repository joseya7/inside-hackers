import React from 'react'

import './ProfileMain.css'

import ProfileFollow from './ProfileFollow'
import ProfilePosts from './ProfilePosts'

const ProfileMain = ({ match, history }) => {
  return (
    <div className="profile-main">
      <ProfilePosts match={match} />
      <ProfileFollow history={history} match={match} />
    </div>
  )
}

export default ProfileMain
