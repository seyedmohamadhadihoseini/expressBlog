const postModel = require("@models/posts");
const userModel = require("@models/users");
const commentModel = require("@models/comments");
const commentPresenter = require("@presentation/comments");
const commentStatus=require("@models/comments/status");
const _=require("lodash");
exports.showPost = async (req, res) => {
    const postSlug = req.params.post_slug;
    const post = await postModel.findBySlug(postSlug);
    if (!post) {
        return res.redirect("/404");
    }
    const post_comments = await commentModel.findAll([], [`post_id=${post.id}`]);

    let comments=  await commentPresenter.present(post_comments);
    const commentLength=comments.length;
    
    for(let i=0;i<commentLength;++i)
    {
        if (comments[i].status != commentStatus.status.ACCEPTED)
        {
            delete comments[i];
        }

    }
    const newComments=_.groupBy(comments,"parent");
    // _.groupBy(comments,"parent");
    const editedPost = {
        ...post, Author: await userModel.findOne(post.author_id)
    };
    return res.frontRender("front/post/single", {
        post: editedPost,
        comments:newComments[0],
        helpers: {
            isGuest: () => {
                return !('user' in req.session);
            },
            hasChild:(comment)=>{
                
                return comment.id in newComments;
            },
            getChildrens:(id)=>{
                return newComments[id];
            }
        }
    });
}
