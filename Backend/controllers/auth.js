const User = require("../models/user");
const {validationResult} = require("express-validator")
var jwt = require('jsonwebtoken');
var expressJwt= require('express-jwt');
exports.signout = (req,res) =>{
   res.clearCookie("token")

   return res.json({
       message: "User signout done"
   })
}
exports.signin = (req,res)=>{
    
    const {email, password}= req.body;
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            err:"Some error in input"
        })
    }
    User.findOne({email},(err,user)=>{
            if(err || !user){
                return res.status(400).json({
                    err:"User  email does not exits"
                })
            }
            if(!user.authenticate(password)){
                return res.status(401).json({
                    err:"Email/Password does not match"
                })

            }
            // create a tokken 
            const tokken = jwt.sign({_id:user.id},process.env.SECRET)

            // put tokken in cokkie

            res.cookie("token",tokken,{expire: new Date()+9999});
            const{_id,name,email,role}= user; 
            return res.status(200).json({
                tokken,
                user:{
                    _id,name,email,role
                }
            })

    })
}

exports.signup = (req,res) =>{
    const errors=validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({
            err:"Some error in input"
        })
    }

    const user = new User(req.body);
    user.save((err,user)=>{
        if(err){
            return res.status(400).json({
                Error:"Not able to save"
            })
        }

        return res.json(user);
    });
    
 }
 
 exports.isSiginIn = expressJwt({
     secret:process.env.SECRET,
     userProperty:"auth"

 });

 exports.isAuthenticated = (req,res,next)=>{
    let checker = req.profile && req.auth && req.profile._id == req.auth._id // we are in same profile as we signed into
    if(!checker){
        return res.status(403).json({
            err:"Unauhtoriused access..."
        })
    }

    next();
 }

 exports.isAdmin = (req,res,next)=>{
    if(req.profile.role === 0 )
    {
        return res.status(403).json({
            err:"Access Denied...."
        });
    }
    next();
 }