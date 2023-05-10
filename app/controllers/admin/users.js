const userModel = require("@models/users");
exports.index = async (req, res) => {
    const users = await userModel.findUsers();
    res.render("admin/users/", {
        layout: "admin", users
    });
};
exports.newuser = async (req, res) => {

    const formData = req.session.createuserFormData||{};
    const kerrors = req.session.kerrors||{};
    let roles=[]
    res.render("admin/users/new_user", {
        layout: "admin", HasError: kerrors.length > 0, errors:kerrors, formData,
    })
    delete req.session.kerrors;
    delete req.session.createuserFormData;
}
exports.SaveNewuser = async (req, res) => {

    errMsg = userValidation.validate(req.body.title, req.body.slug, req.body.content);
    if (errMsg.length > 0) {
        req.session.createuserFormData = { ...req.body };
        req.session.kerrors = errMsg;
        res.redirect("/admin/users/new_user");
        return;
    }
    user = new userEntites(req.body.author, req.body.title, req.body.slug, req.body.content, req.body.status, 1);
    await userModel.SaveNewuser(user);
    this.index(req, res);


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
    const authors = await userModel.findUsers(['fullName', 'id']);
    res.render("admin/users/new_user", {
        layout: "admin", authors,  selectedId: result.author_id,formData:result,type:"edit_user",
        helpers:{
            isuserAuthor:function(userId,options){
                return userId===result.author_id;
            }
        }
    });
    req.session.userId=userId;
}
exports.Updateuser=async(req,res)=>{
    await userModel.update(req.session.userId, new userEntites(req.body.author, req.body.title,
        req.body.slug, req.body.content, req.body.status,1));
    res.redirect("/admin/users");
};