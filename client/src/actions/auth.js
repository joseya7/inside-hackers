import axios from 'axios'

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
  CLEAR_USER_ERROR,
} from './types'

import setAuthToken from '../utils/setAuthToken'

// 유저정보 Action
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }
  try {
    const res = await axios.get('/api/auth')

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    })
  }
}

// 회원가입 Action
export const register = (formData) => async (dispatch) => {
  dispatch({
    type: CLEAR_USER_ERROR,
  })
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const body = JSON.stringify(formData)
  try {
    const res = await axios.post('/api/users', body, config)

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    })
    dispatch(loadUser())
  } catch (err) {
    const errors = err.response.data.errors

    dispatch({
      type: REGISTER_FAIL,
      payload: errors,
    })
  }
}

// 로그인 Action
export const login = (email, password) => async (dispatch) => {
  dispatch({
    type: CLEAR_USER_ERROR,
  })
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const body = JSON.stringify({ email, password })

  try {
    const res = await axios.post('/api/auth', body, config)

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    })
    dispatch(loadUser())
  } catch (err) {
    const errors = err.response.data.errors

    dispatch({
      type: LOGIN_FAIL,
      payload: errors,
    })
  }
}

// 로그아웃 Action
export const logout = (history) => (dispatch) => {
  dispatch({
    type: CLEAR_PROFILE,
  })
  history.push('/')
  dispatch({
    type: LOGOUT,
  })
}
