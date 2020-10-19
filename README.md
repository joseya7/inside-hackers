# Inside Hackers(소셜 네트워크 서비스)

## 개요

1. 저의 **세번째** 웹 개발 풀스택 프로젝트입니다.
2. 사용한 프레임워크 : **React, Redux, Node.js, MongoDB, Express.js Material-UI,등등**
3. 배포 : heroku
4. **_LIVE_** : https://aqueous-shore-19495.herokuapp.com/

---

## 웹 사이트 구경하기

### \* 회원가입 / 로그인

![ezgif com-crop (5)](https://user-images.githubusercontent.com/30207544/96406103-ba0f9d80-1219-11eb-9976-b3c9ad136ea9.gif)

1. 회원가입 후 로그인하는 장면입니다.
2. 인증과정은 json webotoken을 사용하였습니다.

![ezgif com-crop (6)](https://user-images.githubusercontent.com/30207544/96406286-107cdc00-121a-11eb-8b5d-661698774eb2.gif)

1. 아이디나 비밀번호가 틀렸을 경우 backend validation의 error message를 client에서 출력합니다.

### \* 글 쓰기 / 글 읽기

![ezgif com-crop(1)](https://user-images.githubusercontent.com/30207544/96407628-c34e3980-121c-11eb-92c3-26677cf6ee91.gif)

### \* 프로필 수정 / 프로필 보기 / 유저가 쓴 글 확인

![ezgif com-crop(2)](https://user-images.githubusercontent.com/30207544/96407776-1e802c00-121d-11eb-8324-60c978e482a2.gif)

![ezgif com-crop(3)](https://user-images.githubusercontent.com/30207544/96407914-64d58b00-121d-11eb-92a1-e5bc42075fa2.gif)

### \* 댓글 달기 / 글 좋아요

![ezgif com-crop(4)](https://user-images.githubusercontent.com/30207544/96408065-af570780-121d-11eb-9665-21de40287490.gif)

### \* 팔로우

![ezgif com-crop(5)](https://user-images.githubusercontent.com/30207544/96408169-e5948700-121d-11eb-8b7a-7c8f85b7ff46.gif)

---

## 삽질하면서 깨달은 점

### **1. DB설계가 쉽지않았다.**

- 유저 스키마, 프로필 스키마, 글 스키마 간에 명확한 관계를 정의하지 않아서, 이것 때문에 마지막에는 코드를 중구난방으로 쓰게 된거 같았다. 기능을 추가하면 추가할수록 더욱 더 복잡해질거같은데,DB설계하는 책을 읽어봐야 겠다.
- 유저가 쓴 글을 불러오는 기능을 구현할 때, id를 프로필에서 가져올지 유저에서 가져와야할지 잘 몰랐다.

### **2. react-router-dom의 remount.**

- 이것 때문에 이틀동안 고생했다.
- profile/user1에서 profile/user2로 remount가 되지 않았다. 결국엔 찾았지만 삽질해가면서 react-router-dom에 대해 조금은 더 잘알게 된거 같았다.

### \*\*3. redux state를 좀 더 정리해가면서 써야 한다.

- 지금은 그래도 크게 4개의 state이지만, 나중에 state가 늘어나게되면 복잡해질거 같다. 좀 더 일관성있고 가독성 있도록 state를 분류해가면서 써야겠다.
