const persianDateService = require("@services/dateServices");
const langService = require("@services/langService");
const userModel = require("@models/users");
const postModel = require("@models/posts");

exports.present =(comments) => {
    let newcomments=comments.map(async(comment)=>{
        comment.created_at_persian = langService.toPersianNumber(persianDateService.toPersianDate(comment.created_at, "dddd DD MMMM YYYY    - HH:mm:ss"));
        if (comment.author_id) {
            let user =await userModel.findOne(comment.author_id);
            comment.user_name = user.fullName;
            comment.user_email = user.email;
        }
        if(comment.post_id)
        {
            let post = await postModel.findOne(comment.post_id);
            if(post)
            {
                comment.post_title=post.title;
            }
            // comment.post_title=post.title;
        }
        delete comment.author_id;
        return comment;
    });
    
    
    return comments;
}
