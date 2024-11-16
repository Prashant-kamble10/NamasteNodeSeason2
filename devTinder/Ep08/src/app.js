// 1st connect to DB & then run server // VERY VERY IMP

const express = require("express")
const connectDB = require("./config/database")
const User = require("./models/user")

const app = express();

 app.use(express.json())           // middleware to handle API request send from frontend / postman

// creating post "/signup"
app.post("/signup" , async (req, res)=>{

    // creating a new instance of a User model
    const user = new User(req.body)
try{
    await user.save()
    res.send("user added successfully")
}catch(err){
    res.status(400).send("error sending the user, " + err.message)
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


