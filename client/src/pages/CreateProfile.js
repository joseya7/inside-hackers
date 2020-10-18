import React from 'react'
import './CreateProfile.css'

import Header from '../layout/Header'
import Footer from '../layout/Footer'
import ProfileForm from '../components-create-profile/ProfileForm'

const CreateProfile = () => {
  return (
    <div className="create-profile">
      <Header />
      <ProfileForm />
      <Footer />
    </div>
  )
}

export default CreateProfile
