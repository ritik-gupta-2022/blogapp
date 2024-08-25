import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
import postRoutes from './routes/post.route.js'
import commentRoutes from './routes/comment.route.js'
import cookieParser from 'cookie-parser';  // package for extracting cokie from browser

// This line loads environment variables from the .env file into process.env
dotenv.config()

// url form atlas
mongoose.connect(process.env.MONGO)
.then(()=>console.log("mongoDB connected"))
.catch((err)=>console.log(err))

const app = express();

// for converting json data to object sent by server
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.listen(3000,()=>{
    console.log("server connected at port 3000");
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);

//this middleware will be called when an error is tackled , this is to increase code reusability
app.use((err, req, res, next)=>{
    const statusCode = err.StatusCode || 500;
    const message = err.message || 'Internal Server error';
    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})

//  res.json({message: "This is a testing" }); send the message in json form