

const mongoose = require("mongoose")  // mongoose helps you connect nodejs application to mongodb compass or mongodb atlas cluster

// mongodb+srv://pbkamble198:VYdDctK8GEODclbt@mongodb13.erglx.mongodb.net/                  => refering to cluster
// mongodb+srv://pbkamble198:VYdDctK8GEODclbt@mongodb13.erglx.mongodb.net/NamasteNode       => refering to cluster and DB present within it
const connectDB = async() =>{
    await mongoose.connect("mongodb+srv://pbkamble198:VYdDctK8GEODclbt@mongodb13.erglx.mongodb.net/devTinder")   // it returns promise so we have it through async and await.
}


module.exports = connectDB;


   


