const router = require("express").Router();
const logoutController=require("adminControllers/logout");

router.get("/",logoutController.logout);
module.exports = router;