import React from 'react'
import './ReadPost.css'

import Header from '../layout/Header'
import Footer from '../layout/Footer'
import ReadPostContainer from '../components-read-post/ReadPostContainer'

const ReadPost = ({ match }) => {
  return (
    <div>
      <Header />
      <ReadPostContainer match={match} />
      <Footer />
    </div>
  )
}

export default ReadPost
