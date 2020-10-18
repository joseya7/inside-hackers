import React, { useEffect } from 'react'
import './GetProfile.css'

import Header from '../layout/Header'
import Footer from '../layout/Footer'
import ProfileHeader from '../components-getprofile/ProfileHeader'
import ProfileMain from '../components-getprofile/ProfileMain'

const GetProfile = (props) => {
  const { match, history } = props
  useEffect(() => {
    console.log(props)
  }, [])

  return (
    <div className="get-profile">
      <Header />
      <ProfileHeader match={match} />
      <ProfileMain match={match} history={history} />
      <Footer />
    </div>
  )
}

export default GetProfile
