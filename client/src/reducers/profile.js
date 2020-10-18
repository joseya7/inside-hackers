import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  FOLLOWERS_USER,
  FOLLOWINGS_USER,
} from '../actions/types'

const initialState = {
  profile: null,
  profiles: [],
  loading: true,
  error: {},
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false,
      }
    case PROFILE_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false,
      }
    case FOLLOWERS_USER:
      return {
        ...state,
        profile: {
          ...state.profile,
          user: {
            ...state.profile.user,
            followers: action.payload,
          },
        },
      }
    case FOLLOWERS_USER:
      return {
        ...state,
        profile: {
          ...state.profile,
          user: {
            ...state.profile.user,
            followings: action.payload,
          },
        },
      }

    default:
      return state
  }
}
