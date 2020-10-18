import axios from 'axios'

import {
  FOLLOWERS_USER,
  FOLLOWINGS_USER,
  PROFILE_ERROR,
  GET_TOP_FIVE_USERS,
  USER_ERROR,
} from './types'

//유저 팔로우 하고, 상대 유저에 내 이름 넣기(FOLLOWERS)(UPDATE)
export const followUser = (userId) => async (dispatch) => {
  try {
    const resFollower = await axios.put(`/api/users/follow/${userId}`)

    const resFollowing = await axios.put(
      `/api/users/follow/in-my-list/${userId}`
    )

    dispatch({
      type: FOLLOWERS_USER,
      payload: resFollower.data,
    })

    dispatch({
      type: FOLLOWINGS_USER,
      payload: resFollowing.data,
    })
  } catch (err) {
    console.log(err.response)
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response && err.response.data.msg && err.response.data.msg,
        status: err.response && err.response.status,
      },
    })
  }
}

//팔로우가 많은 상위 5명의 유저들 가져오기
export const getFiveUsers = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/users/top-5')

    dispatch({
      type: GET_TOP_FIVE_USERS,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}
