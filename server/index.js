import express from "express"
import connectDB from "./db/connectDB.js";
import dotenv from "dotenv"
import userRoute from "./routes/user.routes.js"
import cookieParser from "cookie-parser";
import cors from "cors"
import bodyParser from "body-parser";
import courseRoute from "./routes/course.routes.js"
import mediaRoute from "./routes/media.routes.js"
import purchaseRoute from "./routes/purchaseCourse.routes.js"
import courseProgressRoute from "./routes/courseProgress.routes.js"

dotenv.config({})

//connect database connection here
connectDB();

const app = express();
const PORT = process.env.PORT || 8000;

//default middleware
// app.use(bodyParser.json())
app.use(express.json())
app.use(cookieParser())
const corsOptions ={
    origin : "http://localhost:5173",
    credentials:true
}
app.use(cors(corsOptions))

//api
app.use("/api/v1/user",userRoute)
app.use("/api/v1/course",courseRoute)
app.use("/api/v1/media",mediaRoute)
app.use("/api/v1/purchase", purchaseRoute)
app.use("/api/v1/progress", courseProgressRoute)

app.listen(PORT,()=>{
    console.log(`Server listen on port ${PORT}`)
})