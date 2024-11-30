// 1st connect to DB & then run server // VERY VERY IMP

const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors")
const app = express();

 //  middleware to handle cors error
app.use(cors({
  origin : "http://localhost:5173",
  credentials : true
}))           
app.use(express.json()); // middleware to handle API request send from frontend / postman
app.use(cookieParser()); // middleware to read cookies from the user

const authRouter = require("./routes/auth")
const profileRouter = require("./routes/profile")
const requestRouter = require("./routes/request")
const userRouter = require("./routes/user")

app.use("/", authRouter)
app.use("/", profileRouter)
app.use("/", requestRouter)
app.use("/", userRouter)




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
