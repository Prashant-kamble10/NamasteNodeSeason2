// importance of middlewares, route handlers, request handlers

// const express = require("express")

// const app = express()  

// I can't keep the admin url public, so i need to check the authorization of admin

// app.get("/admin/getAllData", (req, res)=>{
    // logic of checking if the request is authorized

    
    // const token = "xyz";
    // const token = "xyzabc";
//     const isAdminAuthorized = token === "xyz"

//     if (isAdminAuthorized){
//         res.send("Get All Data")
//     }else{
//         res.status(401).send("unauthorized request")
//     }
   
// })

// app.get("/admin/DeleteAllData", (req, res)=>{

     // logic of checking if the request is authorized

    
    //  const token = "xyz";
     // const token = "xyzabc";
//      const isAdminAuthorized = token === "xyz"
 
//      if (isAdminAuthorized){
//         res.send("Delete All Data")
//      }else{
//          res.status(401).send("unauthorized request")
//      }
   
// })


// checking authorization/token for admin again and again is not good.
// to not to do this repeatedly, middlewares comes into picture.

// app.listen(5000, ()=>{
//     console.log("server successfully hosted on the port 5000")
// })


// 1-------------------------------------------------------------------------------------------------------------------------------------

// writing middlewares

// gnerally middlewares are written using app.use(), bcoz i want my middleware to work for get also, post also   etc.

// const express = require("express")

// const app = express()  

// handle authorization middleware for all request GET, POST, PUT, DELETE,
//  you can use app.all() also.   app.use() vs app.all(), both have subtle difference
// app.use("/admin", (req, res, next)=>{
//     console.log("admin auth is getting checked")
//     const token = "xyz";
    // const token = "xyzabc";
//     const isAdminAuthorized = token === "xyz"

//     if (!isAdminAuthorized){
//         res.status(401).send("unauthorized request")
//     }else{
//         next()
//     }
// })

// app.get("/admin/getAllData", (req, res)=>{
//         res.send("Get All Data")
// })

// app.get("/admin/DeleteAllData", (req, res)=>{
//         res.send("Delete All Data")

// })

// app.listen(5000, ()=>{
//     console.log("server successfully hosted on the port 5000")
// })


// output 

// when hit, /admin/getAllData => "admin auth is getting checked", Get All Data"
// when hit, /admin/DeleteAllData => "admin auth is getting checked", Delete All Data"


// 2-------------------------------------------------------------------------------------------------------------------------------------

// CAREFULLY observe the diiference in code

// const express = require("express")

// const app = express()  


// app.use("/admin", (req, res, next)=>{
//     console.log("admin auth is getting checked")
//     const token = "xyz";
    // const token = "xyzabc";
//     const isAdminAuthorized = token === "xyz"

//     if (!isAdminAuthorized){
//         res.status(401).send("unauthorized request")
//     }else{
//         next()
//     }
// })

// app.get("/user", (req, res)=>{
//     res.send("user Data")
// })

// app.get("/admin/getAllData", (req, res)=>{
//         res.send("Get All Data")
// })

// app.get("/admin/DeleteAllData", (req, res)=>{
//         res.send("Delete All Data")

// })

// app.listen(5000, ()=>{
//     console.log("server successfully hosted on the port 5000")
// })


// output 

// when hit, /user => user Data"

// 3-------------------------------------------------------------------------------------------------------------------------------------

// INDUSTRY LEVEL PRACTICE WRT MIDDLEWARES
// create middlewares folder, in that create auth.js file, in that write logic

const express = require("express")
const {adminAuth} = require("./middlewares/adminAuth")

const app = express()  


app.use("/admin", adminAuth)

app.get("/user", (req, res)=>{
    res.send("user Data")
})

app.get("/admin/getAllData", (req, res)=>{
        res.send("Get All Data")
})

app.get("/admin/DeleteAllData", (req, res)=>{
        res.send("Delete All Data")

})

app.listen(5000, ()=>{
    console.log("server successfully hosted on the port 5000")
})