// 1st connect to DB & then run server // VERY VERY IMP

const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/adminAuth");

const app = express();

app.use(express.json()); // middleware to handle API request send from frontend / postman
app.use(cookieParser()); // middleware to read cookies from the user

// creating post "/signup"
app.post("/signup", async (req, res) => {
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

    await user.save();
    res.send("user added successfully");
  } catch (err) {
    res.status(400).send("error sending the user, " + err.message);
  }
});

app.post("/login", async (req, res) => {
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

      res.send("Login successfully !!!");
    } else {
      throw new Error("Password is not correct");
    }
  } catch (error) {
    res.status(400).send("error sending the user, " + error.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    // From the cookie, backend engg will extract token and will validated it.
    // validate successfully, user will get profile.
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(400).send("error sending the user, " + error.message);
  }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user.firstName +" "+  "sent the connection request");
  } catch (error) {
    res.status(400).send("connection request failed");
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established....");
    app.listen(5000, () => {
      console.log("server successfully hosted on the port 5000");
    });
  })
  .catch((err) => {
    console.log("Database canoot be connected");
  });
