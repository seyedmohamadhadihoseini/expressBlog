const router = require("express").Router();
const homeRouter=require("./home");
const postRouter=require("./post");

router.use("/",homeRouter);
router.use("/",postRouter);


module.exports = router;