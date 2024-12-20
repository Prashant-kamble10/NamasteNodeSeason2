const validator = require("validator")


const validateSignUpData = (req)=>{

const {firstName, lastName, emailId, password} = req.body;

if(!firstName || !lastName){
    throw new Error("Enter correct name")
}else if(!validator.isEmail(emailId)){
    throw new Error("Enter correct email ID")
}else if(!validator.isStrongPassword(password)){
    throw new Error("Enter strong password")
}

}

module.exports = {
    validateSignUpData
}