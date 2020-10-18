export default function validate(values) {
  let errors = {}

  //이메일 검증
  if (!values.email) {
    errors.email = '이메일을 입력해주세요'
  } else if (
    !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      values.email
    )
  ) {
    errors.email = '이메일을 정확히 입력해주세요'
  }

  //이름 검증
  if (!values.name.trim()) {
    errors.name = '이름을 입력해주세요'
  }

  //비밀번호 검증
  if (!values.password) {
    errors.password = '비밀번호를 입력해주세요'
  } else if (values.password.length < 6) {
    errors.password = '비밀번호는 6자리 이상이여야 합니다'
  }

  //2차비밀번호 검증
  if (!values.password2) {
    errors.password2 = '비밀번호를 입력해주세요'
  } else if (values.password2 !== values.password) {
    errors.password2 = '비밀번호가 일치하지 않습니다.'
  }

  return errors
}
