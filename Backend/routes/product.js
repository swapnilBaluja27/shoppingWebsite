var express = require("express")
var router = express.Router()
const {isAdmin,isAuthenticated,isSiginIn} = require("../controllers/auth")
const {getProductById} = require("../controllers/product")
const {getUserById} = require("../controllers/user")
// all of params
router.params("userId",getUserById);
router.params("productId",getProductById);

// all of actual routes

router.get("/product/:productId",getProduct);

module.exports= router;