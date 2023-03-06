var express = require("express")
var router = express.Router()
const {getUserById,getUser,updateUser,userPurchaseList} = require("../controllers/user");
const {isAdmin,isAuthenticated,isSiginIn} = require("../controllers/auth");
router.param("userId",getUserById)
router.get("/user/:userId",isSiginIn,isAuthenticated,getUser)
router.put("/user/:userId",isSiginIn,isAuthenticated,updateUser);
router.get("/orders/user/:userId",isSiginIn,isAuthenticated,userPurchaseList);

module.exports = router;