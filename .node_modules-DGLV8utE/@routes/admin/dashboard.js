const router = require("express").Router();
const dashboardController = require("adminControllers/dashboard");

router.get("/", dashboardController.index);

module.exports=router;