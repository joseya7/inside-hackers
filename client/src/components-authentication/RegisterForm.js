import React, { useState } from 'react'
import './RegisterForm.css'

import { register } from '../actions/auth'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import validate from '../helper-functions/auth-validate'
import Alert from '@material-ui/lab/Alert'

const RegisterForm = ({ register, isAuthenticated, error }) => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  const [errors, setErrors] = useState({})

  const { name, email, password } = values

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    setErrors(validate(values))

    register({ name, email, password })
  }

  if (isAuthenticated) {
    return <Redirect to="/" />
  }

  return (
    <form className="login" onSubmit={handleSubmit}>
      <div className="login__inner">
        <div className="form-control">
          <label htmlFor="">이메일</label>
          <input
            type="text"
            className={`form-input ${errors.email && 'form-input-error'}`}
            name="email"
            placeholder="이메일을 입력해주세요."
            value={values.email}
            onChange={handleChange}
          />
          <p className={errors.email && 'show-error'}>{errors.email}</p>
        </div>

        <div className="form-control">
          <label htmlFor="">이름</label>
          <input
            type="text"
            name="name"
            className={`form-input ${errors.name && 'form-input-error'}`}
            placeholder="이름을 입력해주세요"
            value={values.name}
            onChange={handleChange}
          />
          <p className={errors.name && 'show-error'}>{errors.name}</p>
        </div>

        <div className="form-control">
          <label htmlFor="">비밀번호</label>
          <input
            type="password"
            name="password"
            className={`form-input ${errors.password && 'form-input-error'}`}
            placeholder="비밀번호를 입력해주세요"
            value={values.password}
            onChange={handleChange}
          />
          <p className={errors.password && 'show-error'}>{errors.password}</p>
        </div>

        <div className="form-control">
          <label htmlFor="">비밀번호 검증</label>
          <input
            type="password"
            name="password2"
            className={`form-input ${errors.password2 && 'form-input-error'}`}
            placeholder="비밀번호를 다시 한번 입력해주세요"
            value={values.password2}
            onChange={handleChange}
          />
          <p className={errors.password2 && 'show-error'}>{errors.password2}</p>
        </div>

        {error && (
          <Alert severity="error" className="alert">
            {error.msg}
          </Alert>
        )}

        <button type="submit" className="btn btn-register register-button">
          회원가입
        </button>
      </div>
    </form>
  )
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.auth.error,
})

export default connect(mapStateToProps, { register })(RegisterForm)
