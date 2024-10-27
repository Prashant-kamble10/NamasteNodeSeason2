const express = require("express")

const app = express()  // practical using express

// dyanamic api
// /:  => means dynamic route
app.get("/user/:userId", (req, res)=>{
   console.log(req.params)
   res.send("Data saved to Database successfully")
})

app.listen(5000, ()=>{
    console.log("server successfully hosted on the port 5000")
})