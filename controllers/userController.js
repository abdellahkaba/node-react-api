const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const register = async (req,res) => {

    try{
        //Crypt the password
        const salt = await bcrypt.genSalt(10)
        const has = await bcrypt.hashSync(req.body.password,salt)

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password : has
        })

        const userData = await user.save()
        res.status(200).send({
            success: true,
            message: 'User add with successfully',
            data: userData
        })
    }catch (err){
        res.status(400).send({
            success: false,
            message: err.message

        })
    }
}

const login = async (req,res) => {
    const email = req.body.email
    const user = await User.findOne({email: email})

    if (!user) return res.status(404).send({
        message: "User not found"
    })
    //Verification de mot de pass
    const password = req.body.password
    const isPassword = await bcrypt.compareSync(password,user.password)
    if (!isPassword) return res.status(400).send({
        message: "Invalid credential !"
    })

    //token prend deux parameters
    const token = jwt.sign({_id:user._id}, "secretKey")
    res.cookie('jwt', token,{
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 1 jour
    })
    res.status(200).send({
        message: 'User connected !'
    })
}

const getUserCookie = async (req,res) => {
   try {
       const cookie = req.cookies['jwt']
       const clains = jwt.verify(cookie,'secretKey')

       if (!clains){
           return res.status(401).send({
               message: 'UnAuthenticated'
           })
       }

       const user = await User.findOne({_id: clains._id})
       const {password, ...data} = await user.toJSON()
       res.send(data)
   }catch (err) {
       res.status(400).send({
           message: err.message
       })
   }
}

const logout = async (req,res) => {
    // res.clearCookie('jwt',{
    //     sameSite:"none",
    //     secure:true
    // }).status(200).json("user has been logout !")

    res.cookie('jwt', '', {maxAge: 0})
    res.status(200).send({
        message: 'user has been logout'
    })
}

const getAllUser = async (req,res) => {
    try {
        const users = await User.find({})
        res.status(200).send({
            success: true,
            message: 'All User',
            data: users

        })
    }catch (err) {
        res.status(400).send({
          message: err.message
        })
    }
}

module.exports = {register,login,getUserCookie,logout,getAllUser}