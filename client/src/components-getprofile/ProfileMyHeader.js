import React, { useEffect } from 'react'
import BorderColorIcon from '@material-ui/icons/BorderColor'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCurrentProfile } from '../actions/profile'
import Avatar from 'react-avatar'
import Moment from 'react-moment'

const ProfileMyHeader = ({
  getCurrentProfile,
  auth: { loading, user },
  profile: { profile },
}) => {
  useEffect(() => {
    getCurrentProfile()
  }, [])

  return (
    <div className="profile-header">
      <div className="profile-header__inner">
        {/*  */}
        <Avatar name={user && user.name} className="profile-header__avatar" />
        <div className="profile-header__info">
          <div className="profile-header__idname">
            <h2 className="profile-header__id">
              {user && '@' + user.email.substring(0, user.email.indexOf('@'))}
            </h2>
            <h2 className="profile-header__name">{user && user.name + '님'}</h2>
            <Link to="/create-profile" className="link">
              {!loading && (
                <button className="profile-header__update">
                  <BorderColorIcon />
                </button>
              )}
            </Link>
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

export default connect(mapStateToProps, { getCurrentProfile })(ProfileMyHeader)
