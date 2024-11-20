const express = require("express")
const { userAuth } = require("../middlewares/adminAuth");

const requestRouter = express.Router()

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
    try {
      const user = req.user;
  
      res.send(user.firstName +" "+  "sent the connection request");
    } catch (error) {
      res.status(400).send("connection request failed");
    }
  });
  

module.exports = requestRouter;