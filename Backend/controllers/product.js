const Product = require("../model/Product");
const formidable = require("formidable");
const _ = require("lodash");
const fs= require("fs")
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

exports.createProduct = (req,res)=>{
    let form = formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req,(err,fields,file)=>{
        if(err){
            return res.status(400).json({
                error:"Problem with Image"
            })
        }
        // destructure the fields
        const {price,description,name,category,stock,} = fields

        if(
            !name ||
            !description || 
            !price ||
            !category ||
            !stock
        ){
            return res.status(400).json({
                err:"Please add alll the fieldss"
            })
        }
        let product = new Product(fields)
        
        // handle file here
        if(file.photo){
            if(file.photo.size>3000000)
            {
                return res.status(400).json({
                    err:"File size tooo big"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType= file.photo.type
        }
        // save to DB

        product.save((err,product)=>{
            if(err)
            {
                return res.status(400).json({
                    err:"could not save in DB"
                })
            }
            res.json(product)
        })

    })
}

exports.deleteProduct =(req,res)=>{
    let product = req.product
    product.remove((err,product)=>{
        if(err){
            return res.status(400).json({
                err:"Cannot remove product"
            })
        }
        res.status(200).json({
            message:"Succesfully deleted the product"
        })
    })
}

exports.updateProduct =(req,res)=>{
    let form = formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req,(err,fields,file)=>{
        if(err){
            return res.status(400).json({
                error:"Problem with Image"
            })
        }
        // destructure the fields    
        let product = req.product;
        product =_.extend(product,fields)
        
        // handle file here
        if(file.photo){
            if(file.photo.size>3000000)
            {
                return res.status(400).json({
                    err:"File size tooo big"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType= file.photo.type
        }
        // save to DB

        product.save((err,product)=>{
            if(err)
            {
                return res.status(400).json({
                    err:"Updation failed in DB"
                })
            }
            res.json(product)
        })

    })
}
exports.getAllProducts =(req,res)=>{
    let limit = req.query.limit ? parseInt(req.query.limit):8;
    let sortBy = req.query.sortBy ? req.query.sortBy: "_id";

    Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy,"asc"]])
    .limit(limit)
    .exec((err,products)=>{
        if(err)
        {
            return res.status(400).json({
                err:"No product found"
            })
        }
        res.json(products)
    })
}
exports.getAllUniqueCategories = (req,res)=>{
    Product.distinct("category",{},(err,category)=>{
        if(err)
        {
            return res.status(400).json({
                err:"Catgegory found"
            })
        }
        res.json(category)
    })
}
exports.updateStock = (req,res,next)=>{

    let myOperations= req.body.order.products.map(prod =>{
        return {
            updateOne :{
                filter:{_id:prod._id},
                update:{$inc: {stock: -prod.count ,sold: +prod.count}}
            }
        }
    })

    Product.bulkWrite(myOperations,{},(err,products)=>{
        if(err)
        {
            return res.status(400).json({
                err:"Bulk operation failed"
            })
        }
    })
    next();
}