const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
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

    res.status(200).send({
        message: "User connected",
        data: user
    })
}


module.exports = {register,login}