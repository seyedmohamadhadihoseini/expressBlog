const router = require("express").Router();
const postController = require("@controllers/front/post");
const commentController=require("@controllers/front/comment");
router.get("/p/:post_slug", postController.showPost);
router.post("/p/:post_id/comment",commentController.store);

module.exports = router;