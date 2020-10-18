import React, { useEffect } from 'react'
import './ProfilePosts.css'

import { connect } from 'react-redux'
import { getPostsByUser } from '../actions/post'

import ProfilePostItem from './ProfilePostItem'

const ProfilePosts = ({
  getPostsByUser,
  post: { posts },
  match,
  profile,
  auth,
}) => {
  useEffect(() => {
    getPostsByUser(match.params.id)

    //내 프로필 보기에서 포스트가 뜨게하는 경우 처리
    if (profile.profile !== null) {
      getPostsByUser(profile.profile.user._id)
    }
    //신규가입자 프로필이 없을 때 Posts가 뜨는 경우 처리
    profile.profile === null && auth.user && getPostsByUser(auth.user._id)
  }, [profile, auth])

  return (
    <div className="profile-posts">
      <div className="profile-posts__post-list">
        {posts &&
          posts.map((post) => <ProfilePostItem key={post._id} post={post} />)}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  post: state.post,
  auth: state.auth,
})

export default connect(mapStateToProps, { getPostsByUser })(ProfilePosts)
