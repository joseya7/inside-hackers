import React from 'react'
import './Contents.css'

import PostList from './PostList'
import UserList from './UserList'

const Contents = () => {
  return (
    <div className="contents">
      <PostList />
      <UserList />
    </div>
  )
}

export default Contents
