require('dotenv').config({
    path : "./config/config.env"
})
const cookieParser = require('cookie-parser');
const express = require('express');
const getDatabaseConnection = require('./config/database');
const blogRouter = require('./routes/blogRoutes');
const userRoute = require('./routes/userRoutes');
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use("/api", userRoute);
app.use("/api", blogRouter);

const startMyApp = async () => {
    try {
        await getDatabaseConnection();
        app.listen(process.env.PORT, () => {
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