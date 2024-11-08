//  Error handling

const express = require("express")

const app = express()  

app.get("/user", (req, res)=>{

    try{
        throw new Error("asdfghjkl")
    res.send("user Data sent")
    }catch(error){
        res.status(500).send("contact support team")
    }
})

// we are using app.use("/"), to match all the routes, its like a wildcard, always keep it towards the end.
// (err,req, res, next) => ISKO AISE HI LIKHNA HAI.   // orders matter a lot
// (req, res, next) => ISKO AISE HI LIKHNA HAI.        // orders matter a lot
// (req, res) => ISKO AISE HI LIKHNA HAI.             // orders matter a lot

app.use("/", (err,req, res, next)=>{
    if(err){
        console.log(err)
        res.status(500).send("something went wrong")
    }
})

app.listen(5000, ()=>{
    console.log("server successfully hosted on the port 5000")
})