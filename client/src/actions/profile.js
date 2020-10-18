import axios from 'axios'

import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE } from './types'

//현재 로그인 유저의 프로필 가져오기
export const getCurrentProfile = () => async (dispatch) => {
  try {
    dispatch({
      type: CLEAR_PROFILE,
    })
    const res = await axios.get('/api/profile/me')

    console.log(res.data)

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    })
  }
}

//프로필 수정, 생성
export const createProfile = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const res = await axios.post('/api/profile', formData, config)

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    })
    history.push('/get-my-profile')
  } catch (err) {
    console.log(err)
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
        status: err.response && err.response.status ? err.response.status : err,
      },
    })
  }
}

export const getProfileById = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: CLEAR_PROFILE,
    })
    const res = await axios.get(`/api/profile/user/${userId}`)

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}
