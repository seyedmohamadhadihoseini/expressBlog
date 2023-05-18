const router = require("express").Router();
const commentController = require("adminControllers/comments");
const commentsMiddleware = require("@middlewares/comments");

router.use(['/reject','accept'], commentsMiddleware.idValidation);
router.get("/", commentController.index);
router.get("/remove/:commentId", commentController.remove);
router.get("/reject",commentController.reject);
router.get("/accept",commentController.accept);
module.exports = router;