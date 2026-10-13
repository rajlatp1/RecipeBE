const mongoose = require("mongoose");
const connectionString = process.env.database

mongoose.connect(connectionString).then(()=>{
    console.log("connected to mongoDB")
}).catch((err)=>{
    console.error("Error in connection", err)
})