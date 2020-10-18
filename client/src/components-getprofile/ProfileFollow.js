import React, { useEffect } from 'react'
import './ProfileFollow.css'
import { connect } from 'react-redux'
import { followUser } from '../actions/user'
import Avatar from 'react-avatar'
import { Link, Redirect, withRouter } from 'react-router-dom'

const ProfileFollow = (props) => {
  const { profile, followUser, history, match } = props

  useEffect(() => {
    console.log(props)
  }, [props])

  return (
    <div className="profile-follow">
      <div className="profile-follow__follow-box">
        <button
          onClick={() => followUser(profile.profile.user._id)}
          className="profile-follow__follow-button"
        >
          Follow
        </button>
        <div className="profile-follow__stats">
          Follower{' '}
          <span className="numbers">
            {profile.profile &&
              profile.profile.user &&
              profile.profile.user.followers &&
              !profile.loading &&
              profile.profile.user.followers.length}
          </span>{' '}
          명
        </div>
      </div>
      <div className="profile-follow__following">
        <h2>팔로윙</h2>
        <div className="profile-follow__avatars">
          {/*  */}
          {profile.profile &&
            !profile.loading &&
            profile.profile.user.followings.map((following) => (
              <Link to={`/get-profile/${following.user}`} replace>
                <Avatar
                  className="profile-follow__avatar"
                  name={following.name}
                />
              </Link>
            ))}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  profile: state.profile,
})

export default connect(mapStateToProps, { followUser })(ProfileFollow)
