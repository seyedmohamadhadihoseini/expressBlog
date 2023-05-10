const router=require("express").Router();
const dashboardRouter=require("./dashboard");
const postsRouter=require("./posts");
const commentsRouter=require("./comments");
const userRouter=require("./users");

router.use("/posts",postsRouter);
router.use("/dashboard",dashboardRouter);
router.use("/comments",commentsRouter);
router.use("/users",userRouter);
module.exports=router;