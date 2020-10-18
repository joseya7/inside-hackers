const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const morgan = require('morgan')
const connectDB = require('./config/db')

//환경변수 폴더위치 지정
dotenv.config({ path: './config/config.env' })

//DB연결
connectDB()

const app = express()

app.use(express.json())

// Dev loggin middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// //라우트 선언
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/post', require('./routes/api/post'))

// Production모드일때 static folder정의
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 5000

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)

// Handling되지 않은 Promise처리
process.on('unhandledRejection', (error, promise) => {
  console.log(`Error : ${error.message}`)
  // Close server & exit process
  server.close(() => process.exit(1))
  console.log('Server has been closed due to Error')
})
