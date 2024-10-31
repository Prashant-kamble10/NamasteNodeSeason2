const express = require("express")

const app = express()  // practical using express

// see the sequence of the route and their behavior, IMP order of writing the routes matter alot

app.get("/", (req, res)=>{
   res.send("Namaste from the /")
})

app.get("/test",(req, res)=>{
   res.send("Namaste from the /test")
})

// /test == /test/hello 
// /test !== /testhello

// /test/hello => Namaste from the /test => OK
// /testhello => cannot get testhello => Not OK

// that's why ⬇️ printing

// localhost:5000/ => Namaste from the /
// localhost:5000/test => Namaste from the /


app.get("/home",(req, res)=>{
   res.send("Namaste from the /home")
})

app.get("/profile",(req, res)=>{
   res.send("Namaste from the /profile")
})


app.listen(5000, ()=>{
    console.log("server successfully hosted on the port 5000")
})
