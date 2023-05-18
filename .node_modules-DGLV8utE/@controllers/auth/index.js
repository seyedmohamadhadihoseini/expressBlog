const authService = require("@services/authService");
const userRoles = require("@models/users/status");
const userModel=require("@models/users");
const registerValidation = require("@validation/register");
const userValidation=require("@validation/newUser");
const userEntites = require("@entities/User");
exports.showLogin = async (req, res) => {
    
    res.render("auth/login", { layout: "auth", errorMessage: req.session.loginErrorMessage });
    delete req.session.loginErrorMessage;
}
exports.doLogin = async (req, res) => {
    const { loginPassword, loginEmail } = req.body;
    let result = await authService.login(loginEmail, loginPassword);
    if (result == false) {
        req.session.loginErrorMessage = "رمز عبور یا ایمیل به درستی وارد نشده است";
        res.redirect("/auth/login");
        return;
    }
    req.session.user = result;
    if ([userRoles.userRoles.ADMIN, userRoles.userRoles.WRITER].includes(result.role))
        res.redirect("/admin/dashboard");
    else
        res.redirect("/");
}
exports.showRegister = async (req, res) => {
    res.render("auth/register", { layout: "auth", errorMessages: req.session.kerrors });
    delete req.session.kerrors;
}
exports.doRegister = async (req, res) => {
    const iRegister = req.body;
    let errMsg=await registerValidation({
        email: iRegister.email,
        password: iRegister.password,
        password_confirmation: iRegister.password_confirmation,
        fullname:iRegister.fullname
    });
    if (errMsg.length==0) {
        
        errMsg = userValidation.validate(iRegister.fullname, iRegister.email,iRegister.password);
        if (errMsg.length > 0) {
            req.session.kerrors = errMsg;
            return res.redirect("/auth/register");
        }
        user = new userEntites(iRegister.fullname, iRegister.email, iRegister.password, userRoles.userRoles.USER);
        await userModel.SaveNewuser(user);
        return res.redirect("/auth/login");
    }
    else {
        req.session.kerrors =errMsg;
        return res.redirect("/auth/register");
    }
}
