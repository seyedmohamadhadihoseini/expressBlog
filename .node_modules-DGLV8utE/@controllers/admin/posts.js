const postModel = require("@models/posts");
const Postpresent = require("@presentation/posts");
const postEntites = require("@entities/Post");
const userModels = require("@models/users");
const postValidation = require("@validation/newPost");
const postStatus=require("@models/posts/status");
exports.index = async (req, res) => {

    const posts = await postModel.findAll();
    const presentPosts = posts.map(post => {
        return Postpresent.present(post);
    });
    res.newRender("admin/posts/", {
        layout: "admin", posts: presentPosts
    });

};

exports.newPost = async (req, res) => {
    const authors = await userModels.findUsers(['fullName', 'id']);
    const formData = req.session.createPostFormData||{};
    const kerrors = req.session.kerrors||{};
    res.render("admin/posts/new_post", {
        layout: "admin", authors, HasError: kerrors.length > 0, errors:kerrors, formData,
        postStatus: postStatus.status, persianStatus: postEntites.persianStatus
    })
    delete req.session.kerrors;
    delete req.session.createPostFormData;
}
exports.SaveNewPost = async (req, res) => {
    errMsg = postValidation.validate(req.body.title, req.body.slug, req.body.content);
    if (errMsg.length > 0) {
        req.session.createPostFormData = { ...req.body };
        req.session.kerrors = errMsg;
        res.redirect("/admin/posts/new_post");
        return;
    }
    post = new postEntites(req.body.author, req.body.title, req.body.slug, req.body.content, req.body.status, 1);
    await postModel.SaveNewPost(post);
    this.index(req, res);
}
exports.removePost = async (req, res) => {
    await postModel.removePost(req.query.postId);
    this.index(req, res);
}
exports.editPost=async(req,res)=>{
    let postId = req.query.postid;
    if(!postId)
    {
        this.newPost(req,res);
        return;
    }
    let result= await postModel.findOne(postId);

    const authors = await userModels.findUsers(['fullName', 'id']);
    res.render("admin/posts/new_post", {
        layout: "admin", authors,  selectedId: result.author_id,formData:result,type:"edit_post",
        postStatus:postStatus.status,persianStatus:postEntites.persianStatus,
        helpers:{
            isPostAuthor:function(userId,options){
                return userId===result.author_id;
            }
        }
    });
    req.session.postId=postId;
}
exports.UpdatePost=async(req,res)=>{
    await postModel.update(req.session.postId, new postEntites(req.body.author, req.body.title,
        req.body.slug, req.body.content, req.body.status,1));
    res.redirect("/admin/posts");
};