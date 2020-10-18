import React, { useEffect } from 'react'
import './ProfileHeader.css'
import Moment from 'react-moment'
import Avatar from 'react-avatar'

import { connect } from 'react-redux'
import { getProfileById } from '../actions/profile'

const ProfileHeader = ({
  getProfileById,
  auth: { loading, user },
  profile: { profile },
  match,
}) => {
  useEffect(() => {
    getProfileById(match.params.id)
  }, [])

  return (
    <div className="profile-header">
      <div className="profile-header__inner">
        <Avatar
          name={!loading && profile && profile.user.name}
          className="profile-header__avatar"
        />
        <div className="profile-header__info">
          <div className="profile-header__idname">
            <h2 className="profile-header__id">
              {profile &&
                '@' +
                  profile.user.email.substring(
                    0,
                    profile.user.email.indexOf('@')
                  )}
            </h2>
            <h2 className="profile-header__name">
              {profile && profile.user.name + '님'}
            </h2>
            {/* <Link to="create-profile" className="link">
              {!loading && (
                <button className="profile-header__update">
                  <BorderColorIcon />
                </button>
              )}
            </Link> */}
          </div>
          <div className="profile-header__bio">
            <span className="profile-header__bio-item">
              {profile && profile.age + '  •  '}
            </span>
            <span className="profile-header__bio-item">
              {profile && profile.address + '  •  '}
            </span>
            <span className="profile-header__bio-item">
              {'  '}{' '}
              {profile && (
                <>
                  <Moment format="YYYY-MM-DD">{profile.date}</Moment>
                  <span>에 가입하셨습니다.</span>
                </>
              )}
            </span>
            <span className="profile-header__bio-item">
              {profile && profile.job + '  •  '}
            </span>
            <span className="profile-header__bio-item">
              {profile && profile.skills + '  •  '}
            </span>
            <div
              className="profile-header__bio-item"
              style={{ textAlign: 'left' }}
            >
              {profile && profile.bio}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
})

export default connect(mapStateToProps, { getProfileById })(ProfileHeader)
