var express = require("express");
var router = express.Router()
const {getCategoryById,getCategory,createCategory} = require("../controllers/category")
const {isAuthenticated,isAdmin,isSiginIn} = require("../controllers/auth")
const {getUserById} = require("../controllers/user")

//Params
router.param("userId",getUserById);
router.param("categoryId",getCategoryById);
router.get("/category/:categoryId",getCategory)

// actual routes

router.post("/category/create/:userId",isSiginIn,isAuthenticated,isAdmin,createCategory);


module.exports = router;