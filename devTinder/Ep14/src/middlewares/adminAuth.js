const jwt = require("jsonwebtoken");
const User = require("../models/user")

const userAuth = async (req, res, next) => {
  try {
    // Read the token from the req cookies
    // validate the token
    // find the user

    const { token } = req.cookies;
    if (!token) {
        // throw new Error("Invalid token");
        return res.status(401).send("please login !!!")
      }

    const decodedMsg = await jwt.verify(token, "DEV@Tinder$790");

    const { _id } = decodedMsg;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("user do not exist");
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(400).send("Error" + error.message);
  }
};

module.exports = {
  userAuth,
};
