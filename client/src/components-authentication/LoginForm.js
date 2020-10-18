import React, { useState } from 'react'
import './LoginForm.css'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../actions/auth'
import Alert from '@material-ui/lab/Alert'

const LoginForm = ({ login, isAuthenticated, error }) => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({})

  const { email, password } = values

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    login(email, password)
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
          <label htmlFor="">비밀번호</label>
          <input
            type="password"
            name="password"
            className={`form-input ${errors.password && 'form-input-error'}`}
            placeholder="비밀번호를 입력해주세요."
            value={values.password}
            onChange={handleChange}
          />
          <p className={errors.password && 'show-error'}>{errors.password}</p>
        </div>

        {error && (
          <Alert severity="error" className="alert">
            {error.msg}
          </Alert>
        )}
        <button className="btn btn-register"> 로그인</button>
      </div>
    </form>
  )
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.auth.error,
})

export default connect(mapStateToProps, { login })(LoginForm)
