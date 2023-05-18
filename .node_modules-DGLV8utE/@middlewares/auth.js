const userRoles=require("@models/users/status");
module.exports=(req,res,next)=>{
    if("user" in req.session){
        if(req.session.user.role==userRoles.userRoles.ADMIN)
        {
            next();
            return;
        }
        delete req.session.user;
    }
    res.redirect("/");
}