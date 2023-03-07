const category = require("../models/category")
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
exports.getAllCategory = (req,res)=>{
    Category.find().exec((err,items)=>{
        if(err)
        {
            return res.status(400).json({
                err:"Categroy does not exits"
            })
        }
        res.json(items)
    })
}
exports.updateCategory =(req,res)=>{
    const category= req.category;
    category.name = req.body.name;
    category.save((err,updatedCategory)=>{
        if(err){
            return res.status(400).json({
                err:"failed"
            })
        }
        res.json(updatedCategory)
    })
}