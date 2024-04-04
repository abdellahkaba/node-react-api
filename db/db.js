const mongoose = require('mongoose')


const connectDB = async () => {

    try {
        mongoose.set("strictQuery", false)
        await mongoose.connect("mongodb+srv://abdellah:Kaba987k@cluster0.gyjh5xk.mongodb.net/post-db").then(() => console.log("Connexion reussi avec success "))
    }catch (err){
        console.log(err)
        process.exit()
    }
}

module.exports = connectDB()