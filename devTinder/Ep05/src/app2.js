// One more ways of defining route handler, it will exactly the same way

// const express = require("express")

// const app = express()  

// app.use("/user", (req, res, next)=>{

//     console.log("Rote handler 1")
//     next()
//     res.send("1st response")
     
// });
// app.use("/user", (req, res, next)=>{

//     console.log("Rote handler 2")
//      res.send("2nd response")

// })

// app.listen(5000, ()=>{
//     console.log("server successfully hosted on the port 5000")
// })

// 1------------------------------------------------------------------------------------------------------------------------------------

// change the order of the Route handler function

// const express = require("express")

// const app = express()  

// app.use("/user", (req, res, next)=>{

//     console.log("Rote handler 2")
//      res.send("2nd response")

// })


// app.use("/user", (req, res, next)=>{

//     console.log("Rote handler 1")
//     next()
//     res.send("1st response")
     
// });


// app.listen(5000, ()=>{
//     console.log("server successfully hosted on the port 5000")
// })


//  output 

// Rote handler 2
// 2nd response

 // 2------------------------------------------------------------------------------------------------------------------------------------

//  guess the output of the code 

//  const express = require("express")

//  const app = express()  
 
//  app.use("/user", (req, res, next)=>{
 
//      console.log("Rote handler 2")
//      next()
 
//  })
 
 
//  app.use("/user", (req, res, next)=>{
 
//      console.log("Rote handler 1")
//      next()
     
      
//  });
 
 
//  app.listen(5000, ()=>{
//      console.log("server successfully hosted on the port 5000")
//  })

//   output 

// Rote handler 2
// Rote handler 1
// Cannot GET /user,  404 Not Found

 // 3------------------------------------------------------------------------------------------------------------------------------------

 //  guess the output of the code 

//  const express = require("express")

//  const app = express()  
 
//  app.use("/user", (req, res, next)=>{
 
//      console.log("Rote handler 2")
//      next()
 
//  })
 
 
//  app.use("/user", (req, res, next)=>{
 
//      console.log("Rote handler 1")
     
      
//  });
 
 
//  app.listen(5000, ()=>{
//      console.log("server successfully hosted on the port 5000")
//  })

//   output 

// Rote handler 2
// Rote handler 1
// postman went into Infinte loop searching for response.

// 4------------------------------------------------------------------------------------------------------------------------------------

//  middlewares  and route handlers

const express = require("express")

const app = express()  

//  matched routes, Route handler  passing request to next Route handler, so we will call this Route handler has a "Middlewares"
app.use("/", (req, res, next)=>{
    next()                                         
})

// here also, matched routes, below Route handler passing request to next Route handler, so we will call this Route handler has a "Middlewares"
app.get("/user", (req, res, next)=>{
     next()  

},
// here also,  matched routes, below Route handler passing request to next Route handler, so we will call this Route handler has a "Middlewares"
(req, res, next)=>{
    next()     

// here,  matched routes, below Route handler sending res.send() to postman, so we will call this Route handler has a "Request handler"
// so whichever,  Route handler sending res.send() to postman, are called as "Request handler"
}, (req, res, next)=>{
    res.send("Responded") 

});

app.listen(5000, ()=>{
    console.log("server successfully hosted on the port 5000")
})


// output 

// Responded 

 // 5------------------------------------------------------------------------------------------------------------------------------------