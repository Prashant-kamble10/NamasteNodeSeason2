const express = require("express")

const app = express()  // practical using express

app.use("/test",(req, res)=>{                         
   res.send("Namaste from the /test")
})


// this will only handle GET call to /user
app.get("/user", (req, res)=>{
   res.send({
      firstName : "prashant", 
      lastName: "kamble"
   })
})


app.post("/user", (req, res)=>{
   res.send("Data saved to Database successfully")
})
// app.post("Here Regex can also come", (req, res)=>{
//    res.send("Data saved to Database successfully")
// })

app.listen(5000, ()=>{
    console.log("server successfully hosted on the port 5000")
})