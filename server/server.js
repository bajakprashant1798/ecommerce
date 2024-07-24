import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

dotenv.config({
    path: "./.env"
})

const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))


const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
    res.json({msg: "This is example."})
})

app.listen(PORT, () => {
    console.log("Server is running...");
})




//routes import
import userRouter from  "./routes/user.routes.js"
import categoryRouter from "./routes/category.routes.js"
import productRouter from "./routes/product.routes.js"
import upload from "./routes/upload.routes.js"

//routes declaration
app.use("/users", userRouter)
app.use("/api", categoryRouter)
app.use("/api", upload)
app.use("/api", productRouter)




//connect mongodb
const URI = process.env.MONGODB_URI
// console.log(process.env.MONGODB_URI);


mongoose.connect(URI,{
    // useCreateIndex: true,
    // useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB Connected");
}).catch((err) => {
    console.log("MONGODB connection Error: ", err);
})
