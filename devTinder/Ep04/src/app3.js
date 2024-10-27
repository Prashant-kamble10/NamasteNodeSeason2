const express = require("express")

const app = express()  // practical using express

// see the sequence of the route and their behavior, IMP order of writing the routes matter alot

app.use("/test",(req, res)=>{
   res.send("Namaste from the /test")
})

app.use("/test/2",(req, res)=>{
   res.send("Namaste from the /test")
})

app.use("/home",(req, res)=>{
   res.send("Namaste from the /home")
})

app.use("/profile",(req, res)=>{
   res.send("Namaste from the /profile")
})

// change the sequence of below code ⬇️
app.use("/", (req, res)=>{
    res.send("Namaste from the /")
 })


app.listen(5000, ()=>{
    console.log("server successfully hosted on the port 5000")
})