import React, { Fragment } from 'react'
import './Header.css'

import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../actions/auth'

import Avatar from 'react-avatar'
import { withRouter } from 'react-router-dom'

const Header = ({
  auth: { isAuthenticated, loading, user },
  logout,
  history,
}) => {
  const authLinks = (
    <div className="header__profile-logout">
      <Link to={`/get-my-profile/`}>
        <Avatar
          name={user ? user.name : 'J'}
          className="header__profile-avatar"
        />
      </Link>
      <a onClick={() => logout(history)} href="#!">
        <button className="btn">로그아웃</button>
      </a>
    </div>
  )

  const guestLinks = (
    <div className="header__authentication">
      <Link to="/login">
        {' '}
        <button className="btn">로그인</button>
      </Link>
      <Link to="/register">
        <button className="btn btn-register">회원가입</button>
      </Link>
    </div>
  )

  return (
    <div className="header">
      <div className="header__inner">
        <div className="header__logo">
          <Link to="/" className="header__home-link">
            <img
              src={require('../images/hacker.png')}
              alt=""
              className="header__icon"
            />
            <h3 className="header__text">Inside Hackers</h3>
          </Link>
        </div>
        {!loading && (
          <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { logout })(withRouter(Header))
