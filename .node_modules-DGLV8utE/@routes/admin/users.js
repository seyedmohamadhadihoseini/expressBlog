const router = require("express").Router();
const userController = require("adminControllers/users");

router.get("/", userController.index);
router.get("/new_user",userController.newuser);
router.post("/new_user", userController.SaveNewuser)
router.get("/remove/",userController.removeuser);
router.get("/edit_user",userController.edituser);
router.post("/edit_user",userController.Updateuser);
module.exports = router;