var express = require("express");
var router = express.Router()

const {isAuthenticated,isSiginIn} = require("../controllers/auth")
const {getUserById,pushOrderInPurchaseList} = require("../controllers/user")
const {updateStock} = require("../controllers/product")

const {getOrderById,createOrder} = require("../controllers/order")


//params
router.param("userId",getUserById)
router.param("orderId",getOrderById)

//actual route

router.post("/order/create/:userId",
isSiginIn,
isAuthenticated,
pushOrderInPurchaseList,
updateStock,
createOrder)
module.exports =router