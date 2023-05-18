const router=require("express").Router();
const dashboardRouter=require("./dashboard");
const postsRouter=require("./posts");
const commentsRouter=require("./comments");
const userRouter=require("./users");
const settingRouter=require("./settings");
const logoutRouter=require("./logout");

router.use("/posts",postsRouter);
router.use("/dashboard",dashboardRouter);
router.use("/comments",commentsRouter);
router.use("/users",userRouter);
router.use("/settings",settingRouter);
router.use("/logout",logoutRouter);
module.exports=router;  