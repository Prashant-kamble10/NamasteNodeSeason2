

const mongoose = require("mongoose")

// you make schema obj from schema class => then you create model with "model name" and "schema name", export the model => with that model you create objects that will save in mongoDB. 

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