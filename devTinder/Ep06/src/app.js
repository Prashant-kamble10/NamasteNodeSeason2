// 1st connect to DB & then run server // VERY VERY IMP

const express = require("express")
const connectDB = require("./config/database")
const User = require("./models/user")

const app = express();

// creating post "/signup"
app.post("/signup" , async (req, res)=>{

    const userObj = {
        firstName : "virat",
        lastName : "Kohli",
        email : "virat@kohli.com",
        password: "virat@123"
    }

    // creating a instance of a User model
    const user = new User(userObj)
try{
    await user.save()
    res.send("user added successfully")
}catch(err){
    res.status(400).send("error sending the user" + err.message)
}

  
})

connectDB().then(()=>{
    console.log("Database connection established....")
    app.listen(5000, ()=>{
        console.log("server successfully hosted on the port 5000")
    })
}).catch((err)=>{
    console.log("Database canoot be connected")
})


