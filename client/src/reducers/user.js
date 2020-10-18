import { USER_ERROR, GET_TOP_FIVE_USERS } from '../actions/types'

const initialState = {
  loading: true,
  users: null,
  error: {},
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TOP_FIVE_USERS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      }

    case USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}
