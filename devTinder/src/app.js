const express = require("express")

const app = express()  // practical using express

app.get("/", (req, res)=>{
   res.send("Namaste from the /")
})

// app.use("/", (req, res)=>{
//    res.send("Namaste from the /")
// })

app.get("/test",(req, res)=>{
   res.send("Namaste from the /test")
})

app.get("/home",(req, res)=>{
   res.send("Namaste from the /home")
})

app.listen(5000, ()=>{
    console.log("server successfully hosted on the port 5000")
})
