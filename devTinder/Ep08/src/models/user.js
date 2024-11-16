const mongoose = require("mongoose")
const validator = require("validator")


// if I am creating user schema that means in schema what information of user i am going to store. 
const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true, 
        minLength : 4,
        maxLength : 50

    },
    lastName : {
        type : String
    },
     emailId : {
        type : String,
        lowercase :true,
        trim : true,
        required : true,
        unique: true,
        index : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Enter coreect email id.")
            }
        }
    },
    password : {
        type : String,
        required : true
    },
    age : {
        type : Number,
        min : 18,
    },
    gender : {
        type : String,
        // custom validation
        validate(value){
            if(!["male", "female", "others"].includes(value)){
                throw new Error("Gender is not validate")
            }
        }
    },
    photoUrl : {
        type : String,
        default : "https://www.google.com/search?q=photo+url+sample"
    },
    about : {
        type : String,
        default : "This is a default information about developer"
    },
    skills : {
        type : [String]
    }
}, {timestamps: true})


const User = mongoose.model("User" , userSchema)

module.exports = User;