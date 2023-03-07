const {Order,ProductCart} = require("../models/order")
exports.getOrderById = (res,req,next, id)=>{
    Order.findById(id)
    .populate("products.product","name price")  // need to learn products.product
    .exec((err,order)=>{
        if(err)
        {
            return res.status(400).json({
                err:"No order found in DB"
            })
        }
        res.order = order;
    })
    next();
}

exports.createOrder = (req,res)=>{
    req.body.order.user = req.profile;
    const order = new Order(req.body.order)
    order.save((err,order)=>{
        if(err)
        {
            return res.status(400).json({
                err: "failed to save"
            })
        }
        res.json(order)
    })
}