const userModel = require("@models/users");
const userStatus = require("@models/users/status");
const userValidation=require("@validation/newUser");
const userRoles=require("@models/users/status");
const userPersentation=require("@presentation/users");
const userEntites=require("@entities/User");


exports.index = async (req, res) => {
    const users = await userModel.findUsers();
    const persentadUsers=userPersentation.present(users);
    res.newRender("admin/users/", {
        layout: "admin", users:persentadUsers
    });
};
exports.newuser = async (req, res) => {

    const formData = req.session.createuserFormData||{};
    const kerrors = req.session.kerrors||{};
    let roles=['کاربری','نویسنده','مدیر'];
    res.render("admin/users/new_user", {
        layout: "admin", HasError: kerrors.length > 0, errors:kerrors, formData,roles,helpers:{
            isCurrentRole:function(role,options){
                return false;
            }
        }
    })
    delete req.session.kerrors;
    delete req.session.createuserFormData;
}
exports.SaveNewuser = async (req, res) => {

    errMsg = userValidation.validate(req.body.fullname, req.body.email, req.body.password);
    if (errMsg.length > 0) {
        req.session.createuserFormData = { ...req.body };
        req.session.kerrors = errMsg;
        res.redirect("/admin/users/new_user");
        return;
    }
    user = new userEntites(req.body.fullname, req.body.email, req.body.password,userStatus.toNumber(req.body.userRole));
    await userModel.SaveNewuser(user);
 
    res.redirect("/admin/users/");

}
exports.removeuser = async (req, res) => {
    await userModel.removeuser(req.query.userId);
    this.index(req, res);
}
exports.edituser=async(req,res)=>{
    let userId = req.query.userid;
    if(!userId)
    {
        this.newuser(req,res);
        return;
    }
    let result= await userModel.findOne(userId);
    const roles=userRoles.userStatus;
    const userRole=userRoles.userStatus[result.role];
    console.log("userRole : ",userRole);
    res.render("admin/users/new_user", {
        layout: "admin",roles,userRole, userId,formData:result,type:"edit_user",title:"ویرایش کاربر",
        helpers:{
            isuserAuthor:function(userId,options){
                return userId===result.author_id;
            },
            isCurrentRole:function(role,options){
                return role==userRole;
            }
        }
    });
    req.session.userId=userId;
}
exports.Updateuser=async(req,res)=>{
    const Euser=req.body;
    // console.log(Euser);
    
    
    // return res.redirect("/admin/users");
    const reuslt= await userModel.update(Euser.EuserId,{
        fullName:Euser.fullname,
        email:Euser.email,
        password:Euser.password,
        role:userStatus.toNumber(Euser.userRole)
    });
    res.redirect("/admin/users");
};