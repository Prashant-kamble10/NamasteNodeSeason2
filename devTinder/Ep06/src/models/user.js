

const mongoose = require("mongoose")


// if I am creating user schema that means in schema what information of user i am going to store. 
const userSchema = new mongoose.Schema({
    firstName : {
        type : String
    },
    lastName : {
        type : String
    },
    password : {
        type : String
    },
    age : {
        type : Number
    },
    gender : {
        type : String
    }
})


const User = mongoose.model("User" , userSchema)

module.exports = User;