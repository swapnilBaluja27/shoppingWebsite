var express = require("express");
var router = express.Router()
const {getCategoryById,getCategory,createCategory,getAllCategory,updateCategory} = require("../controllers/category")
const {isAuthenticated,isAdmin,isSiginIn} = require("../controllers/auth")
const {getUserById} = require("../controllers/user")

//Params
router.param("userId",getUserById);
router.param("categoryId",getCategoryById);
// read route
router.get("/category/:categoryId",getCategory)
router.get("/categories",getAllCategory)

// actual routes
router.post("/category/create/:userId",isSiginIn,isAuthenticated,isAdmin,createCategory);

// update route

router.put("/category/:categoryId/:userId",isSiginIn,isAuthenticated,isAdmin,updateCategory)
module.exports = router;