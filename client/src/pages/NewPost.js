import React from 'react'

import Header from '../layout/Header'
import Footer from '../layout/Footer'
import PostContents from '../components-newPost/PostContents'

const NewPost = () => {
  return (
    <div className="new-post">
      <Header />
      <PostContents />
      <Footer />
    </div>
  )
}

export default NewPost
