const router = require("express").Router();
const homeController = require("@controllers/front/home");

router.get("/", homeController.index);



module.exports = router;