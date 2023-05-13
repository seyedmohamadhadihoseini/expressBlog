const adminRoute=require("./admin");
const authRoute=require("./auth");
const authMiddleware = require("@middlewares/auth");
const loggedOnMiddleware = require("@middlewares/loggedOn");

module.exports=(app)=>{
    app.use("/admin", authMiddleware,adminRoute);
    app.use("/auth",loggedOnMiddleware,authRoute);
};