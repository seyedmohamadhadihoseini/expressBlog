const commentModel = require("@models/comments");
const commentPresenter = require("@presentation/comments");

exports.index=async(req,res)=>{
    let comments=await commentModel.findAll();
    comments=commentPresenter.present(comments);
    res.render("admin/comments",{layout:"admin",comments});
};
exports.remove=async(req,res)=>{
    let commentId=req.params.commentId;
    if(commentId)
    {
        commentModel.remove(commentId);
        
    }
    res.redirect("/admin/comments");
};