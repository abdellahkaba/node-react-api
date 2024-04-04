const express = require('express')
const app = express()
const cors = require('cors')


app.use(cors({
    origin: "*"
}))

const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://abdellah:Kaba987k@cluster0.gyjh5xk.mongodb.net/post-db")

const  post_route = require('./routes/router')
app.use('/api',post_route)

app.listen(8000,function (){
    console.log('Server lance')
})
