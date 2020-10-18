import axios from 'axios'
import {
  GET_POSTS,
  POST_ERROR,
  GET_POST,
  ADD_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
  UPDATE_LIKES,
  UPDATE_LIKES_IN_READING,
} from './types'

// 글들 가져오기-시간순(RETRIEVE))
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/post')

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

// 글들 가져오기-(유저의 ID)
export const getPostsByUser = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/post/user/${userId}`)

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

// 글 가져오기-ID(RETRIEVE)
export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/post/${id}`)

    dispatch({
      type: GET_POST,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

// 글 올리기(CREATE)
export const addPost = (formData, history) => async (dispatch) => {
  console.log(formData)
  try {
    const res = await axios.post('/api/post', formData)

    dispatch({
      type: ADD_POST,
      payload: res.data,
    })
    history.push('/')
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

// 댓글 올리기(CREATE)
export const addComment = (postId, formData) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/post/comment/${postId}`, formData)

    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

// 댓글 삭제(DELETE)
export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    await axios.delete(`/api/post/comment/${postId}/${commentId}`)

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId,
    })
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

//좋아요-랜딩페이지에서(CREATE)
export const addLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/post/like/${id}`)

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    })
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

//좋아요-글읽기에서(CREATE)
export const addLikeInReading = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/post/like/${id}`)

    dispatch({
      type: UPDATE_LIKES_IN_READING,
      payload: { id, likes: res.data },
    })
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

//좋아요제거-글읽기에서(PUT)
export const removeLikeInReading = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/post/unlike/${id}`)

    dispatch({
      type: UPDATE_LIKES_IN_READING,
      payload: { id, likes: res.data },
    })
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}
