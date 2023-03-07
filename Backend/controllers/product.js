const Product = require("../model/Product");
exports.getProductById = (req,res,next,id)=>{
    Product.findOne(id)
    .exec((err,product)=>{
        if(err)
        {
            return res.status(400).json({
                err:"product does not exits"
            })
        }
        req.product=product;
    })
    next();
}