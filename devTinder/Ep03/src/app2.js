const express = require("express")

const app = express()  // practical using express

// BETTER to use app.get() for routing, rather than using app.use()

// app.get() matches exact path,
// app.use() not sure to match path it can match subpath also.

// app.get(): This method in Express is used for handling GET requests for an exact path. It only matches requests where the URL path is exactly what you specify. For instance, if you write app.get('/home', callback), it will only respond to requests made to /home and not to any sub-paths like /home/about.

// app.use(): This is a middleware function that is more flexible with path matching. It can handle not only the exact path but also any sub-paths starting with the specified path. So, if you write app.use('/home', callback), it will match /home, /home/about, /home/contact, and any other route that starts with /home.

// This flexibility with app.use() makes it particularly useful for setting up middleware that should apply to a group of routes (like authentication or logging) rather than a single, specific path.


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
