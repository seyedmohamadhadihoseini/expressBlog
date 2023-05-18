const postModel = require("@models/posts");
const userModel = require("@models/users");
const commentModel=require("@models/comments");
exports.store = async (req, res) => {
    const commentForm = req.body;
    const postId = req.params.post_id;
    let comment = {
        ...commentForm, post_id: postId, author_id:"user" in req.session? req.session.user.id : null
    }
    const result=await commentModel.store(comment);
    if(!result)
    {
        return res.redirect("/404");
    }
    const post=await postModel.findOne(postId);
    res.redirect(`/p/${post.slug}`);
}