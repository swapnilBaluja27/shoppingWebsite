const User = require("../models/user")
const Order = require("../models/Order")
exports.getUserById = (req,res,next,id) =>{
    User.findById(id).exec((err,user)=>{

        if(err || !user)
        {
            return res.status(404).json({
                err: "No user found"
            })
        }
        req.profile= user
    })

    next();
};
exports.getUser = (req,res)=>{

    return res.json(req.profile)
}
exports.updateUser =(req,res) =>{
    User.findByIdAndUpdate(
        {_id:req.profile._id},
        {$set: req.body},
        {new: true,useFindAndModify:false},
        (err,user)=>{
            if(err)
            {
                return res.status(400).json({
                    err: "User does not exits",
                })
            }
            
            res.json(user);
        }
    )
}
exports.userPurchaseList = (req,res)=>{
    Order.find({user: req.profile._id})
    .populate("user","_id name")
    .exec((err,order)=>{
        if(err){
            return res.status(400).json({
                err: "No order in this user account"
            })
        }
        return res.json(order)
    })

}
// Middle wareee.
exports.pushOrderInPurchaseList = (req,res,next)=>{
    let purchases = []
    req.body.order.products.forEach(product => {
        purchases.push({
            _id:product._id,
            name:product.name,
            desc:product.description,
            category:product.category,
            quantity:product.quantity,
            amount:req.body.order.amount,
            transaction_id:req.body.order.transaction_id
        })
        
    });
    // store in DB.
    User.findOneAndUpdate(
        {_id:req.profile_id},
        {
            $push: {purchases:purchases}
        },
        {new : true},
        (err,purchases)=>{
            if(err)
            {
                return res.status(400).json({
                    err: "unable to save purchases in list"
                })
            }
            next();

        }
    )
    
}