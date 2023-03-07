const mongoose = require("mongoose");
const user = require("./user");
const {ObjectId} = mongoose.Schema;
const ProductCartSchema = new mongoose.Schema({
    product:{
        type:ObjectId,
        ref:"Product"
    },
    name:{
        type:String,
    }
    ,
    count:Number,
    price:Number
});
const Product=  mongoose.model("ProductCart",ProductCartSchema);
const orderSchema= new mongoose.Schema({

    product: [ProductCartSchema],
    transaction_id:{
    },
    amount:{
        type:Number
    },
    address:{
        type:String,
    },
    status:{
        type:String,
        default:"Received",
        enum:["Cancelled","Delivered","Shipped","Processing","Received"]
    },
    updated:
        Date,
    user:{
        type:ObjectId,
        ref:"User",
    }
},
{
    timestamp:true
});

const Order=  mongoose.model("Order",orderSchema);
module.exports={Order,Product}