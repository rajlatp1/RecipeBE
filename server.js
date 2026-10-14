const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv").config()
const routes = require("./routes")
const connection = require("./dbConnection")

const server = express()
server.use(cors({origin: process.env.clientUrl|| "https://lucky-concha-9c5b42.netlify.app/", credentials: true , allowedHeaders: ["Content-Type", "Authorization"]}))
server.use(express.json())
server.use(routes)

const port = process.env.port || 5000;
server.listen(port, () =>{
    console.log(`server is running on port ${port}`);
})
