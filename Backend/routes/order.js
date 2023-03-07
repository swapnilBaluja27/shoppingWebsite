var express = require("express");
var router = express.Router()

const {isAuthenticated,isSiginIn, isAdmin} = require("../controllers/auth")
const {getUserById,pushOrderInPurchaseList} = require("../controllers/user")
const {updateStock} = require("../controllers/product")

const {getOrderById,createOrder,getAllOrders,getStatus,updateStatus} = require("../controllers/order")


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

router.get("/order/all/:userId",isSiginIn,isAuthenticated,isAdmin,getAllOrders)

router.get("/order/status:userId",isSiginIn,isAuthenticated,isAdmin,getStatus)
router.put("/order/:orderId/status/:userId",isSiginIn,isAuthenticated,isAdmin,updateStatus)
module.exports =router