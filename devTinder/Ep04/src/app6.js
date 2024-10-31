const express = require("express")

const app = express()  // practical using express


// http://localhost:5000/user?userId=101 
// http://localhost:5000/user?userId=101&password="testing"
// query params or user params
app.get("/user", (req, res)=>{
   console.log(req.query)                 //  { userId: 101 }
   res.send("Data saved to Database successfully")
})

app.listen(5000, ()=>{
    console.log("server successfully hosted on the port 5000")
})