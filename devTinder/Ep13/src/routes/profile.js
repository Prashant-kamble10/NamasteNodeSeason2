const express = require("express")
const { userAuth } = require("../middlewares/adminAuth");
const {validateProfileEditData} = require("../utils/validation")

const profileRouter = express.Router()


profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
      // From the cookie, backend engg will extract token and will validated it.
      // validate successfully, user will get profile.
      const user = req.user;
      res.send(user);
    } catch (error) {
      res.status(400).send("error sending the user, " + error.message);
    }
  });

  profileRouter.patch("/profile/edit", userAuth, async(req, res)=>{
     try{
     if( !validateProfileEditData(req)){
      throw new Error("Invalid edit request")
     }

     const loggedInUser = req.user;
  

     Object.keys(req.body).forEach((key)=> (loggedInUser[key] = req.body[key]))
   
     await loggedInUser.save()

     res.json({message : `${loggedInUser.firstName}, profile updated successfully`, data :loggedInUser })
     }catch(error){
      res.status(400).send("error editing the user, " + error.message);
     }
  })


module.exports = profileRouter;
