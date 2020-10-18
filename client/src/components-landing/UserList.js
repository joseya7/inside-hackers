import React, { useEffect } from 'react'
import './UserList.css'

import { connect } from 'react-redux'
import { getFiveUsers } from '../actions/user'
import UserItem from './UserItem'

const UserList = ({ getFiveUsers, user }) => {
  useEffect(() => {
    getFiveUsers()
  }, [])

  return (
    <div className="user-list">
      <div className="user-list__header">Top 5 Hackers</div>
      {user.users &&
        user.users.map((user) => <UserItem key={user._id} user={user} />)}
    </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.user,
})

export default connect(mapStateToProps, { getFiveUsers })(UserList)
