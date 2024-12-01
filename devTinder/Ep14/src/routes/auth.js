const express = require("express")
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");



const authRouter = express.Router()

// creating post "/signup"
authRouter.post("/signup", async (req, res) => {
    try {
      // 1. validation of data
      validateSignUpData(req);
  
      // 2. encryption of password
      const { firstName, lastName, emailId, password } = req.body;
  
      const passwordHash = await bcrypt.hash(password, 10);
      // console.log(passwordHash)
  
      // 3. saving data into DB
      // creating a new instance of a User model
      const user = new User({
        firstName,
        lastName,
        emailId,
        password: passwordHash,
      });
  
      const savedUser = await user.save();
      const token = await savedUser.getJWT()
      //  Add token to cookie and send it to user
      res.cookie("token", token);
      res.json({message: "User Added Successfully", data: savedUser});
    } catch (err) {
      res.status(400).send("error sending the user, " + err.message);
    }
  });


  authRouter.post("/login", async (req, res) => {
    try {
      const { emailId, password } = req.body;
  
      const user = await User.findOne({ emailId: emailId });
      if (!user) {
        throw new Error("Email Id not correct");
      }
  
      const isPasswordValid = await user.validatePassword(password)
  
      if (isPasswordValid) {
        // create a JWT token
        const token = await user.getJWT()
        //  Add token to cookie and send it to user
        res.cookie("token", token);
  
        res.send(user);
      } else {
        throw new Error("Password is not correct");
      }
    } catch (error) {
      res.status(400).send("error sending the user, " + error.message);
    }
  });


authRouter.post("/logout", async(req, res)=>{
  res.cookie("token", null, {
    expires : new Date(Date.now())
  }).send("logout successfully !!!")              // res chaining done here

  // res.send("logout successfully !!!")     
})

 
module.exports = authRouter;
