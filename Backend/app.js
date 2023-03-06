const mongoose = require("mongoose");
const express = require("express");
require("dotenv").config();
const bodyparser= require("body-parser");
const cookieparser= require("cookie-parser");
const cors= require("cors"); 
const app = express();
// My routes
const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/user.js");
const catergoryRoutes = require("./routes/category.js");
app.use(bodyparser);
app.use(cookieparser);
app.use(cors);

// mongoDB connection.

mongoose.connect(process.env.DATABASE,
{
    useNewUrlParser:true
}).then(()=>{
    console.log("DB connected");
}
).catch((err)=>{
    console.log(err);
})
// creating a route,
app.use("/api",authRoutes);
app.use("/api",userRoutes);
app.use("/api",catergoryRoutes);

// creating a server 

app.listen(8000,()=>{
    console.log("server running at 8000");
})