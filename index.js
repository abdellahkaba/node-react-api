const express = require('express')
const app = express()
const cors = require('cors')
const connectDB = require('./db/db.js')
const dotenv = require('dotenv').config()
const port = 8000

app.use(cors({
    origin: "*"
}))

connectDB

const post_route = require('./routes/router')
app.use('/api',post_route)

app.listen(port,function (){
    console.log('Server lance')
})
