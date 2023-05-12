const router = require("express").Router();
const settingController = require("adminControllers/settings");

router.get("/", settingController.index);
router.post("/",settingController.store);
module.exports = router;