const router=require("express").Router();
const dashboardRouter=require("./dashboard");
const postsRouter=require("./posts");
const commentsRouter=require("./comments");

router.use("/posts",postsRouter);
router.use("/dashboard",dashboardRouter);
router.use("/comments",commentsRouter);
module.exports=router;