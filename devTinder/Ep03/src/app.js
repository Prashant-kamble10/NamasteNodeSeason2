const express = require("express")

const app = express()  // practical using express

app.use("/", (req, res)=>{
   res.send("Namaste from the /")
})

// app.use("/", (req, res)=>{
//    res.send("Namaste from the /")
// })

app.use("/test",(req, res)=>{
   res.send("Namaste from the /test")
})

app.use("/home",(req, res)=>{
   res.send("Namaste from the /home")
})

app.use("/profile",(req, res)=>{
   res.send("Namaste from the /profile")
})


app.listen(5000, ()=>{
    console.log("server successfully hosted on the port 5000")
})
