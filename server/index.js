import express from "express"
import connectDB from "./db/connectDB.js";
import dotenv from "dotenv"

dotenv.config({})

//connect database connection here
connectDB();

const app = express();
const PORT = process.env.PORT || 8000;

app.listen(PORT,()=>{
    console.log(`Server listen on port ${PORT}`)
})