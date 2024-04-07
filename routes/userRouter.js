const express = require('express')
const cookieParser = require('cookie-parser')
const userRoute = express.Router()

const userController = require('../controllers/userController')

const app = express()
app.use(cookieParser())
userRoute.post("/register", userController.register)
userRoute.post('/login', userController.login)
userRoute.get('/cookie', userController.getUserCookie)
userRoute.post('/logout',userController.logout)
userRoute.get('/user', userController.getAllUser)
module.exports = userRoute
