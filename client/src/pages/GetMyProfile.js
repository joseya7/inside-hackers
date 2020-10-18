import React from 'react'
import Header from '../layout/Header'
import Footer from '../layout/Footer'
import ProfileMyHeader from '../components-getprofile/ProfileMyHeader'
import ProfileMain from '../components-getprofile/ProfileMain'

const GetMyProfile = ({ match }) => {
  return (
    <div className="get-profile">
      <Header />
      <ProfileMyHeader />
      <ProfileMain match={match} />
      <Footer />
    </div>
  )
}

export default GetMyProfile
