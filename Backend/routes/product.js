var express = require("express")
var router = express.Router()

router.params("productId",getProductById);
router.get("/product/:productId",getProduct);