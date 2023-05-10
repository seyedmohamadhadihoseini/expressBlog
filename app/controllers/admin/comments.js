const commentModel = require("@models/comments");
const commentPresenter = require("@presentation/comments");
const commentStatus = require("@models/comments/status");

exports.index = async (req, res) => {
    let comments = await commentModel.findAll();
    comments =await commentPresenter.present(comments);
    res.render("admin/comments", { layout: "admin", comments });
};
exports.remove = async (req, res) => {
    let commentId = req.params.commentId;
    commentModel.remove(commentId);
    res.redirect("/admin/comments");
};
exports.reject = async (req, res) => {
    let commentId=req.query.commentId;
    commentModel.set_status(commentStatus.status.REJECTED, commentId);
    res.redirect("/admin/comments");
};

exports.accept = async (req, res) => {
    let commentId = req.query.commentId;
    commentModel.set_status(commentStatus.status.ACCEPTED, commentId);
    res.redirect("/admin/comments");
};