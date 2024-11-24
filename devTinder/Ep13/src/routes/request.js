const express = require("express")
const { userAuth } = require("../middlewares/adminAuth");
const {ConnectionRequestModel} = require("../models/connectionRequest")
const User = require("../models/user")

const requestRouter = express.Router()

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["ignored" , "interested"]

      if(!allowedStatus.includes(status)){
        return res.status(400).json({
          message : "Invalid status type" + " "+ status
        })
      }
      
      const toUser = await User.findById(toUserId)
      if(!toUser){
        throw new Error("user not found")
      }
     
      const existingConnectionRequest = await ConnectionRequestModel.findOne({
        $or: [
          {fromUserId, toUserId},
          {fromUserId: toUserId, toUserId: fromUserId}
        ]
      })
      if(existingConnectionRequest){
        return res.status(400).send({message : "connection already Exists"})
      }

      const connectionRequest = new ConnectionRequestModel({
        fromUserId,
        toUserId,
        status,
      })

      const data = await connectionRequest.save()
  
      res.json({
        message : req.user.firstName + " " + "is"+ " " + status  + " " + "in" + " "+ toUser.firstName,
        data,
      })
    } catch (error) {
      res.status(400).send("connection request failed" + error.message);
    }
  });
  
  requestRouter.post("/request/review/:status/:requestId", userAuth, async(req, res)=>{
    try{
      // validation of status,
      // validation of requestId,
      // status defenitly should be interested,
      // logged in user => toUserId

      const loggedInUser = req.user;

      const {status, requestId} = req.params;

      const allowedStatus = [ "accepted", "rejected"]
      if(!allowedStatus.includes(status)){
        return res.status(400).json({message : "status not allowed"})
      }

      const connectionRequest = await ConnectionRequestModel.findOne({
        _id : requestId,
        toUserId : loggedInUser._id,
        status : "interested",
      })

      if(!connectionRequest){
        return res.status(404).json({message : "Connection request not found"})
      }

      connectionRequest.status = status;

      const data = await connectionRequest.save();

      res.json({message: "connection request"+ status, data})

    }catch(error){
      res.status(400).send("review connection failed" + error.message)
    }
  })


module.exports = requestRouter;