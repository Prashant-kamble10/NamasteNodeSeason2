const express = require("express")

const app = express()  // practical using express

// dyanamic api
// http://localhost:5000/user/108
// /:  => means dynamic route
app.get("/user/:userId", (req, res)=>{
   console.log(req.params)                            // {108}
   res.send("Data saved to Database successfully")
})

app.listen(5000, ()=>{
    console.log("server successfully hosted on the port 5000")
})