// const express = require("express")

// const app = express()  

// which function is called as a route handler function
// app.use("/user", (req, res)=>{
     // route handler
// })


// app.listen(5000, ()=>{
//     console.log("server successfully hosted on the port 5000")
// })

// 1-------------------------------------------------------------------------------------------------------------------

// const express = require("express")

// const app = express()  


// app.use("/user", (req, res)=>{
//   res.send("Route handler 1")
// })

// app.listen(5000, ()=>{
//     console.log("server successfully hosted on the port 5000")
// })

// 2----------------------------------------------------------------------------------------------------------------------

// if server don't send any response through route handler, in postman you will see infite loop searching for response. our equest will get hang.

// const express = require("express")

// const app = express()  


// app.use("/user", (req, res)=>{
 
// })

// app.listen(5000, ()=>{
//     console.log("server successfully hosted on the port 5000")
// })

// 3----------------------------------------------------------------------------------------------------------------------


// from server we are not sending any response but in route handler we are doing console.log(), run and see the code,
// we will get the console.log() result in the terminal but postman will see infite loop, searching for response. our equest will get hang. 

// const express = require("express")

// const app = express()  


// app.use("/user", (req, res)=>{
 
//     console.log("route handler")
// })

// app.listen(5000, ()=>{
//     console.log("server successfully hosted on the port 5000")
// })

// 4----------------------------------------------------------------------------------------------------------------------

// One route can have multiple route handlers

// const express = require("express")

// const app = express()  

// app.use("/user", (req, res)=>{

  // route handler 1

// }, (req, res)=>{

 // route handler 2

// }, (req, res)=>{

 // route handler 3

// })

// app.listen(5000, ()=>{
//     console.log("server successfully hosted on the port 5000")
// })

// 5----------------------------------------------------------------------------------------------------------------------

// guess the output of the code, with 2 route handlers, what response will be received in postman, uncomment the code and see

// only 1st response, will be received in the postman,
// why 2nd response didn't received in the postman ?

// const express = require("express")

// const app = express()  

// app.use("/user", (req, res)=>{

// console.log("Rote handler 1")
// res.send("1st response")

// }, (req, res)=>{

//     console.log("Rote handler 2")
//     res.send("2nd response")

// })

// app.listen(5000, ()=>{
//     console.log("server successfully hosted on the port 5000")
// })

// 6----------------------------------------------------------------------------------------------------------------------

// now what will be the response, see the above and below code carefully.

// Could not get response in postman, and postman went for infinite loop in search of response

// const express = require("express")

// const app = express()  

// app.use("/user", (req, res)=>{

// console.log("Rote handler 1")


// }, (req, res)=>{

//     console.log("Rote handler 2")
//     res.send("2nd response")

// })

// app.listen(5000, ()=>{
//     console.log("server successfully hosted on the port 5000")
// })

// 7----------------------------------------------------------------------------------------------------------------------

// if we don't give res.send() in route handler 1, but we have res.send() in route handler 2 and we have to show that response,
// How can we do that ? => we use next(), shown in below code.
// you will get "2nd response" as a response in postman

// const express = require("express")

// const app = express()  

// app.use("/user", (req, res, next)=>{

// console.log("Rote handler 1")
// next()

// }, (req, res)=>{

//     console.log("Rote handler 2")
//     res.send("2nd response")

// })

// app.listen(5000, ()=>{
//     console.log("server successfully hosted on the port 5000")
// })

// 8----------------------------------------------------------------------------------------------------------------------

// here we have given, res.send() in route handler 1, then next () in route handler 1, then res.send() in route handler 2
// what will be the behaviour of the code. 

// const express = require("express")

// const app = express()  

// app.use("/user", (req, res, next)=>{

// console.log("Rote handler 1")
// res.send("1st response")
// next()

// }, (req, res)=>{

//     console.log("Rote handler 2")
//     res.send("2nd response")

// })

// app.listen(5000, ()=>{
//     console.log("server successfully hosted on the port 5000")
// })

// output

// Rote handler 1
// 1st response
// Rote handler 2
// Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client 

// it is throwing error because you are sending again response to same URL

// As a developer we should not write this code.

// 9----------------------------------------------------------------------------------------------------------------------

// here we have given, next () in route handler 1, then res.send() in route handler 1, then res.send() in route handler 2
// what will be the behaviour of the code. 

// const express = require("express")

// const app = express()  

// app.use("/user", (req, res, next)=>{

// console.log("Rote handler 1")

// next()
// res.send("1st response")

// }, (req, res)=>{

//     console.log("Rote handler 2")
//     res.send("2nd response")

// })

// app.listen(5000, ()=>{
//     console.log("server successfully hosted on the port 5000")
// })

// output

// Rote handler 1
// Rote handler 2
// 2nd response
// Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client

// As JS is synchronous single threaded languages, it executes code line by line, so you got the error here.

// 10----------------------------------------------------------------------------------------------------------------------

// playing with the code, here we are executing 4 route handlers. CAREFULLY see the code. GUESS the output.

// const express = require("express")

// const app = express()  

// app.use("/user", (req, res, next)=>{

// console.log("Rote handler 1")
// next()

// }, (req, res)=>{

//     console.log("Rote handler 2")
//     res.send("2nd response")

// }, (req, res)=>{

//     console.log("Rote handler 3")
//     res.send("3rd response")

// }, (req, res)=>{

//     console.log("Rote handler 4")
//     res.send("4th response")

// })

// app.listen(5000, ()=>{
//     console.log("server successfully hosted on the port 5000")
// })

// output

// Rote handler 1
// Rote handler 2
// 2nd response

// 11----------------------------------------------------------------------------------------------------------------------

//again playing with the code, here we are executing 4 route handlers. chnaging the next() postion
//  CAREFULLY see the code. GUESS the output.

// const express = require("express")

// const app = express()  

// app.use("/user", (req, res, next)=>{

//     console.log("Rote handler 1")
//      next()

// }, (req, res, next)=>{

//     console.log("Rote handler 2")
//     next()

// }, (req, res, next)=>{

//     console.log("Rote handler 3")
//     res.send("3rd response")

// }, (req, res, next)=>{

//     console.log("Rote handler 4")
//     res.send("4th response")

// })

// app.listen(5000, ()=>{
//     console.log("server successfully hosted on the port 5000")
// })

// output

// Rote handler 1
// Rote handler 2
// Rote handler 3
// 3rd response

// 12----------------------------------------------------------------------------------------------------------------------

//again playing with the code, here we are executing 4 route handlers. chnaging the next() postion
//  CAREFULLY see the code. GUESS the output.

// const express = require("express")

// const app = express()  

// app.use("/user", (req, res, next)=>{

//     console.log("Rote handler 1")
//      next()

// }, (req, res, next)=>{

//     console.log("Rote handler 2")
//     next()

// }, (req, res, next)=>{

//     console.log("Rote handler 3")
//     next()

// }, (req, res, next)=>{

//     console.log("Rote handler 4")
//     res.send("4th response")

// })

// app.listen(5000, ()=>{
//     console.log("server successfully hosted on the port 5000")
// })

// output

// Rote handler 1
// Rote handler 2
// Rote handler 3
// 4th response

// 13----------------------------------------------------------------------------------------------------------------------

//again playing with the code, here we are executing 4 route handlers. chnaging the next() postion
//  CAREFULLY see the code. GUESS the output.

// const express = require("express")

// const app = express()  

// app.use("/user", (req, res, next)=>{

//     console.log("Rote handler 1")
//      next()

// }, (req, res, next)=>{

//     console.log("Rote handler 2")
//     next()

// }, (req, res, next)=>{

//     console.log("Rote handler 3")
//     next()

// }, (req, res, next)=>{

//     console.log("Rote handler 4")
//     next()

// })

// app.listen(5000, ()=>{
//     console.log("server successfully hosted on the port 5000")
// })

// output

// Rote handler 1
// Rote handler 2
// Rote handler 3
// Rote handler 4
// Cannot GET /user, 404 Not Found

// at the 4th route handler, express is expecting another Route handler to execute that's why error came up.

// 14----------------------------------------------------------------------------------------------------------------------

//again playing with the code, here we are executing 4 route handlers. chnaging the next() postion
//  CAREFULLY see the code. GUESS the output.

// const express = require("express")

// const app = express()  

// app.use("/user", (req, res, next)=>{

//     console.log("Rote handler 1")
//      next()

// }, (req, res, next)=>{

//     console.log("Rote handler 2")
//     next()

// }, (req, res, next)=>{

//     console.log("Rote handler 3")
//     next()

// }, (req, res, next)=>{

//     console.log("Rote handler 4")
    

// })

// app.listen(5000, ()=>{
//     console.log("server successfully hosted on the port 5000")
// })



// output

// Rote handler 1
// Rote handler 2
// Rote handler 3
// Rote handler 4
// request got Hanged, postman is searching for the respone and when into infinite loop 

// 15----------------------------------------------------------------------------------------------------------------------

//again playing with the code, here we are executing 4 route handlers. chnaging the next() postion
//  CAREFULLY see the code. GUESS the output.

// const express = require("express")

// const app = express()  

// app.use("/user", (req, res, next)=>{

//     console.log("Rote handler 1")
//      next()

// }, (req, res, next)=>{

//     console.log("Rote handler 2")
//     next()

// }, (req, res, next)=>{

//     console.log("Rote handler 3")
//     next()

// }, (req, res, next)=>{

//     console.log("Rote handler 4")
//     next()

// }, (req, res, next)=>{

//     console.log("Rote handler 5")
//     res.send("5th response")
    
// })

// app.listen(5000, ()=>{
//     console.log("server successfully hosted on the port 5000")
// })



// output

// Rote handler 1
// Rote handler 2
// Rote handler 3
// Rote handler 4
// Rote handler 5
// 5th response

// 16----------------------------------------------------------------------------------------------------------------------

// I can wrap an Route handlers functions in array then also output will be same.

// app.use("/user", [(req, res)=>{ }, (req, res)=>{ }, (req, res)=>{ }, (req, res)=>{ }........(req, res)=>{ }])

// app.use("/user, [RH 1, RH 2, RH 3, RH 4.....RH n]")

// app.use("/user, RH 1, [RH 2, RH 3], RH 4.....RH n")    we can do mix & match and it works same.


const express = require("express")

const app = express()  

app.use("/user", [(req, res, next)=>{

    console.log("Rote handler 1")
     next()

}, (req, res, next)=>{

    console.log("Rote handler 2")
    next()

}, (req, res, next)=>{

    console.log("Rote handler 3")
    next()

}, (req, res, next)=>{

    console.log("Rote handler 4")
    next()

}, (req, res, next)=>{

    console.log("Rote handler 5")
    res.send("5th response")
    
}])

app.listen(5000, ()=>{
    console.log("server successfully hosted on the port 5000")
})



// output

// Rote handler 1
// Rote handler 2
// Rote handler 3
// Rote handler 4
// Rote handler 5
// 5th response