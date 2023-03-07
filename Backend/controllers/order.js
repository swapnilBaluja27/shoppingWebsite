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

exports.getAllOrders =(req,res)=>{
    Order.find()
    .populate("user","_id name")
    .exec((err,order)=>{
        if(err){
            return res.status(400).json({
                err:"order not found"
            })
        }

        res.json(order)
    })
}

exports.getStatus =(req,res)=>{

    res.json(Order.schema.path("status").enumValues)
}
exports.updateStatus=(req,res)=>{

Order.update(
    {_id:req.body.orderId},
    {$set:{status: req.body.status}},
    (err,order)=>{
        if(err)
        {
            return res.status(400).json({err:"Cann update"})

        }
        res.json(order)
    }
)
}