const mongoose = require("mongoose");
const {ObjectID} = mongoose.Schema;
const productSchema = new mongoose.Schema({
    name:{
        type: String,
        trim:true,
        require: true,
        maxLength: 32,
    },
    description:{
        type:String,
        trim:true,
        maxLength: 1500,
    },
    price:{
        type:Number,
        require: true,
        maxLength: 32,
    },
    category:{
        type: ObjectID,
        ref:"Category",
        required: true,
    },
    stock:{
        type:Number,
    },
    sold:{

        type:Number,
        default:0,
    },
    photo:{
        data:Buffer,
        contentType:String
    }

},
{
    timestamp:true,
})

module.exports = mongoose.model("Product",productSchema)