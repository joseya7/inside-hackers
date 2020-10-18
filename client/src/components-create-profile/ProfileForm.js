import React, { useState, useEffect } from 'react'
import './ProfileForm.css'

import { connect } from 'react-redux'
import { getCurrentProfile, createProfile } from '../actions/profile'

import Avatar from 'react-avatar'

import { withRouter } from 'react-router-dom'

const ProfileForm = ({
  getCurrentProfile,
  createProfile,
  history,
  auth: { loading, user },
  profile: { profile },
}) => {
  const [formData, setFormData] = useState({
    age: '',
    address: '',
    job: '',
    skills: '',
    bio: '',
  })

  useEffect(() => {
    getCurrentProfile()

    setFormData({
      age: loading || !profile ? '' : profile.age,
      address: loading || !profile ? '' : profile.address,
      job: loading || !profile ? '' : profile.job,
      skills: loading || !profile ? '' : profile.skills,
      bio: loading || !profile ? '' : profile.bio,
    })
  }, [loading])

  const { age, address, job, skills, bio } = formData

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    createProfile(formData, history)
  }

  return (
    <form className="profile-form" onSubmit={handleSubmit}>
      <div className="profile-form__header">
        <div className="profile-form__header-inner">
          <Avatar
            name={user && user.name}
            className="profile-form__header-avatar"
          />
          <div className="profile-form__header-contents">
            <h2>프로필 수정</h2>
            {/* <h3>이미지를 업로드하시려면 아바타를 클릭해주세요!</h3> */}
          </div>
        </div>
      </div>

      {/* Form 시작부분 */}
      <form className="profile-form__forms">
        <div className="profile-form__forms-inner">
          {/* 나이 */}
          <div className="profile-form__fieldset">
            <label htmlFor="" className="profile-form__forms-label">
              나이
            </label>
            <input
              type="text"
              className="profile-form__forms-input"
              name="age"
              value={age}
              onChange={handleChange}
            />
          </div>

          {/* 주소(도시) */}
          <div className="profile-form__fieldset">
            <label htmlFor="" className="profile-form__forms-label">
              주소
            </label>
            <h3 className="profile-form__text-helper">
              <strong>구</strong> 또는 <strong>시</strong>까지만 적어주세요!
            </h3>
            <input
              type="text"
              className="profile-form__forms-input"
              name="address"
              value={address}
              onChange={handleChange}
            />
          </div>

          {/* 직업 */}
          <div className="profile-form__fieldset">
            <label htmlFor="" className="profile-form__forms-label">
              직업
            </label>
            <input
              type="text"
              className="profile-form__forms-input"
              name="job"
              value={job}
              onChange={handleChange}
            />
          </div>

          {/* 프로그래밍 스킬 */}
          <div className="profile-form__fieldset">
            <label htmlFor="" className="profile-form__forms-label">
              스킬
            </label>
            <h3 className="profile-form__text-helper">
              좋아하는 프레임워크나 프로그래밍 언어를 적어주세요!
            </h3>
            <input
              type="text"
              className="profile-form__forms-input"
              name="skills"
              value={skills}
              onChange={handleChange}
            />
          </div>

          {/* 자기소개 */}
          <div className="profile-form__fieldset">
            <label htmlFor="" className="profile-form__forms-label">
              자기소개
            </label>
            <h3 className="profile-form__text-helper">
              간단한 자기소개를 해주세요!
            </h3>
            <textarea
              type="text"
              className="profile-form__forms-input text-area"
              name="bio"
              value={bio}
              onChange={handleChange}
            />
          </div>
        </div>
        <button className="profile-form__button">프로필 저장</button>
      </form>
    </form>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
})

export default connect(mapStateToProps, { getCurrentProfile, createProfile })(
  withRouter(ProfileForm)
)
