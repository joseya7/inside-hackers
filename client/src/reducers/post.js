import {
  GET_POSTS,
  POST_ERROR,
  GET_POST,
  ADD_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
  UPDATE_LIKES,
  UPDATE_LIKES_IN_READING,
} from '../actions/types'

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      }
    case POST_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case GET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false,
      }
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        loading: false,
      }
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) =>
          //action.payload.id : 글
          post._id === action.payload.id
            ? { ...post, likes: action.payload.likes }
            : post
        ),
        loading: false,
      }
    case UPDATE_LIKES_IN_READING:
      return {
        ...state,
        post: {
          ...state.post,
          likes: action.payload.likes,
        },
        loading: false,
      }
    case ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: action.payload },
        loading: false,
      }
    case REMOVE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            (comment) => comment._id !== action.payload
          ),
        },
        loading: false,
      }
    default:
      return state
  }
}
