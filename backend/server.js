require('dotenv').config({
    path : "./config/config.env"
})
const cookieParser = require('cookie-parser');
const express = require('express');
const getDatabaseConnection = require('./config/database');
const blogRouter = require('./routes/blogRoutes');
const userRoute = require('./routes/userRoutes');
const cloudinary = require('cloudinary');
const app = express();
const PORT = process.env.PORT || 5000;

cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret : process.env.API_SECRET
})

app.use(cookieParser());
app.use(express.json({limit : "50mb"}));
app.use("/api", userRoute);
app.use("/api", blogRouter);

const startMyApp = async () => {
    try {
        await getDatabaseConnection();
        app.listen(PORT, () => {
            console.log("successfully running");
        })
    } catch (error) {
        return res.status(400).json({
            success : false,
            message : error.message
        })
    }
}

startMyApp();