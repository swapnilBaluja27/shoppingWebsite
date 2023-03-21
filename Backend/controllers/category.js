const Category = require("../models/category")
exports.getCategoryById = (req,res,next,id)=>{
    Category.findById(id).exec((err,cate)=>{
        if(err){
            return  res.status(400).json({
                err:"Category not found"
            })
        }
        req.category=cate

    })
    next();
}

exports.getCategory = (req,res)=>{
    return res.json(res.category)
}

exports.createCategory = (req,res)=>{
    const category = new Category(req.body);
    category.save((err,category)=>{
        if(err){
            return res.status(400).json({
                err:"Error could not save"
            })
        }
        res.json(category);
    })

}