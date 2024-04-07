const express = require('express')
const cookieParser = require('cookie-parser')
const userRoute = express.Router()

const userController = require('../controllers/userController')

const app = express()
app.use(cookieParser())
userRoute.post("/register", userController.register)
userRoute.post('/login', userController.login)
userRoute.get('/user', userController.getUser)


module.exports = userRoute
