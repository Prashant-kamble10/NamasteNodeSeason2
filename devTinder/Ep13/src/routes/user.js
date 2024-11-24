const express = require("express")
const userRouter = express.Router()
const {userAuth} = require("../middlewares/adminAuth")
const {ConnectionRequestModel} = require("../models/connectionRequest")

const USER_SAFE_DATA =  "firstName lastName photoUrl about skills age"

// get all the pending request connection for the loggedInUser
userRouter.get("/user/requests/received", userAuth ,async(req, res)=>{
    try{
         const loggedInUser = req.user;

         const connectionRequests = await ConnectionRequestModel.find({
                toUserId : loggedInUser._id,
                status : "interested"
         }).populate("fromUserId", USER_SAFE_DATA)
        //  }).populate("fromUserId", ["firstName" "lastName"])

         res.json({message : "connection data fetched successfully", data : connectionRequests})

    }catch(error){
        res.status(400).send("/user/requests failed", + error.message)
    }
})

userRouter.get("/user/connections", userAuth, async(req, res)=>{
    try{

        const loggedInUser = req.user
        // prashant => elon => accepted
        // elon => mark => accepted
        // I want accepted objects, user can be fromUser or toUser

        const connectionRequests = await ConnectionRequestModel.find({
            $or :[
                {fromUserId: loggedInUser._id, status: "accepted"},
                {toUserId: loggedInUser._id, status: "accepted"}
            ]  
        }).populate("fromUserId", USER_SAFE_DATA)
        .populate("toUserId", USER_SAFE_DATA)


        const data = connectionRequests.map((row)=> {
            if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
                return row.toUserId;
            }
            return row.fromUserId})
        res.json({data })

    }catch(error){
        res.status(400).send("error in /user/connections", + error.message)
    }
})

module.exports = userRouter