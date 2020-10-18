import React, { useState } from 'react'
import './PostContents.css'

import TextareaAutosize from 'react-autosize-textarea'

import CreateIcon from '@material-ui/icons/Create'

import { connect } from 'react-redux'
import { addPost } from '../actions/post'
import { withRouter } from 'react-router-dom'

const PostContents = ({ addPost, history }) => {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    addPost({ title, text }, history)
    setTitle('')
    setText('')
  }

  return (
    <form className="post-contents" onSubmit={handleSubmit}>
      <div className="post-contents__main">
        <div className="post-contents__title">글 올리기</div>
        <div className="post-contents__title-box">
          <CreateIcon className="post-contents__icon" />
          <input
            className="post-contents__title-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <TextareaAutosize
          className="post-contents__textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="post-contents__submit">올리기</button>
        <div className="post-contents__tip-box">
          <h3>Inside Hacker에서 좋은 글을 올리는 방법</h3>
          <ul>
            <h4>제목</h4>
            <li>•{'  '} 읽는 사람이 이해하기 쉽게 올려주세요</li>
            <li>•{'  '} 읽는 사람이 클릭하고 싶게 만들어주세요</li>
          </ul>
          <ul>
            <h4>내용</h4>
            <li>• 간결하게 써주세요</li>
            <li>• 항상 제목과 일치하는 내용을 써주세요</li>
            <li>• 읽기쉽도록 단락을 잘 나눠주세요.</li>
          </ul>
          <ul>
            <h4>공유</h4>
            <li>• 글을 이해하기 쉽도록 참고링크를 달아주세요</li>
            <li>• Twitter나 Github를 통해 글을 공유하세요</li>{' '}
          </ul>
        </div>
      </div>
    </form>
  )
}

export default connect(null, { addPost })(withRouter(PostContents))
