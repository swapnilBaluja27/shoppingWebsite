var express = require("express")
var router = express.Router()
const {isAdmin,isAuthenticated,isSiginIn} = require("../controllers/auth")
const {getProductById,createProduct,deleteProduct,updateProduct,getAllProducts,getAllUniqueCategories} = require("../controllers/product")
const {getUserById} = require("../controllers/user")
const { route } = require("./user")
// all of params
router.params("userId",getUserById);
router.params("productId",getProductById);

// all of actual routes
router.post("/product/create/:userId",isSiginIn,isAuthenticated,isAdmin,createProduct)
router.get("/product/:productId",getProduct);

// delete Route
route.delete("/product/:productId/:userId",isSiginIn,isAuthenticated,isAdmin,deleteProduct)
//Update Route
route.put("/product/:productId/:userId",isSiginIn,isAuthenticated,isAdmin,updateProduct)
// Listing Route
route.get("/products",getAllProducts)
router.get("/products/catergories",getAllUniqueCategories)
module.exports= router;