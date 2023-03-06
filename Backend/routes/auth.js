var express = require("express")
var router = express.Router()
const {signout,signup,signin}= require("../controllers/auth.js");
const {check} = require('express-validator');


// sigin route

router.post("/signin",[
    check("name","name is 5 length ").isLength({ min:5}),
    check("emai","email is required").isEmail(),
    check("password").isLength({min:3})
],signin);

//signup route

router.post("/signup",[
    check("name","name is 5 length ").isLength({ min:5}),
    check("emai","email is required").isEmail(),
    check("password").isLength({min:3})
],signup);

//signout route.

router.get("/signout",signout);

module.exports= router;