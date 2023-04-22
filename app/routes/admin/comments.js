const router = require("express").Router();
const commentController = require("adminControllers/comments");

router.get("/", commentController.index);
router.get("/remove/:commentId", commentController.remove);

module.exports = router;