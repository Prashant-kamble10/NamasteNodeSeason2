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


const validateProfileEditData = (req)=>{
    const allowedEditFields = ["firstName", "lastName", "age", "gender", "photoUrl", "about", "skills"]

const isAllowedEditField = Object.keys(req.body).every((field)=> allowedEditFields.includes(field))

return isAllowedEditField;
}


module.exports = {
    validateSignUpData, validateProfileEditData
}