// 1st connect to DB & then run server // VERY VERY IMP

const express = require("express")
const connectDB = require("./config/database")
const User = require("./models/user")
const {validateSignUpData} = require("./utils/validation")
const bcrypt = require("bcrypt")

const app = express();

 app.use(express.json())           // middleware to handle API request send from frontend / postman

// creating post "/signup"
app.post("/signup" , async (req, res)=>{
  try{

    // 1. validation of data
  validateSignUpData(req)

  // 2. encryption of password
  const {firstName, lastName, emailId, password} = req.body;

  const passwordHash = await bcrypt.hash(password, 10)
  // console.log(passwordHash)

  // 3. saving data into DB
    // creating a new instance of a User model
    const user = new User({
      firstName, lastName, emailId, password : passwordHash
    })

    await user.save()
    res.send("user added successfully")
}catch(err){
    res.status(400).send("error sending the user, " + err.message)
}
})


app.post("/login", async (req, res) => {

  try{
    const {emailId, password} = req.body;

    const user = await User.findOne({emailId: emailId});
    if(!user){
      throw new Error("Email Id not correct")
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(isPasswordValid){
      res.send("Login successfully !!!")
    }else{
      throw new Error("Password is not correct")
    }


  }catch(error){
    res.status(400).send("error sending the user, " + error.message)
  }

})

// creating get "/username"
app.get("/username", async (req, res)=>{
    const userName = req.body.firstName;

  try{
    const users = await User.find({firstName : userName})

    if(users.length === 0){
        res.status(400).send("something went wrong")
    }else{
        res.send(users)
    }
  }catch(erroe){
    res.status(400).send("something went wrong")
  }
})

// Feed AP - GET /feed - get all the users from the database.
// creating get "/feed"
app.get("/feed", async(req, res)=>{
        
        try{
            const users = await User.find({ })
            res.send(users)
        }catch(error){
            res.status(400).send("something went wrong in /feed")
        }
    
})

// creating delete "/user"
app.delete("/user", async (req, res)=>{
    const userId = req.body.userId;

    try{
    // const userDeleted = await User.findByIdAndDelete({_id : userId})
    const userDeleted = await User.findByIdAndDelete(userId)
    res.send("user Deleted")
    }catch(error){
      res.status(400).send("something went wrong in delete/user ")
    }

})


// creating update "/user"

app.patch("/user/:userId", async (req, res)=>{
    const userId = req.params?.userId;
    const data = req.body;


  try {

   const updatesAllowed = ["age", "gender", "photoUrl", "about","skills"];

  const isAllowed = Object.keys(data).every((k) => updatesAllowed.includes(k));
   
  if(!isAllowed){
    throw new Error("update not allowed")
  }
  

    const userUpdate = await User.findByIdAndUpdate({_id : userId}, data, {runValidators : true})
    

    res.send("User updated successfully")
  }catch(error){
    res.status(400).send("Update failed, " + error.message)
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


