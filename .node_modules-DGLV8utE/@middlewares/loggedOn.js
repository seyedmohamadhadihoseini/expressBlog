module.exports = (req, res, next) => {
    if (req.session.user) {
        res.redirect("/admin/dashboard");
        return;
    }
    next();
}