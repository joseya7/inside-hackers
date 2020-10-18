import { useState } from 'react'
import { register } from '../actions/auth'
import { connect } from 'react-redux'

const useForm = (validate, { register }) => {
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

    setErrors({})
    setErrors(validate(values))
    if (!Object.keys(errors).length === 0) {
      register({ name, email, password })
    }
  }

  return { handleChange, values, handleSubmit, errors }
}

export default connect(null, { register })(useForm)
