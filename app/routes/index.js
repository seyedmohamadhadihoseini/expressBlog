const adminRoute=require("./admin");
module.exports=(app)=>{
    app.use("/admin",adminRoute);
};