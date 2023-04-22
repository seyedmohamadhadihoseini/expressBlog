const router = require("express").Router();
const postController = require("adminControllers/posts");

router.get("/", postController.index);
router.get("/new_post",postController.newPost);
router.post("/store", postController.SaveNewPost)
router.get("/remove/",postController.removePost);
router.get("/edit_post",postController.editPost);
router.post("/edit_post",postController.UpdatePost);
module.exports = router;