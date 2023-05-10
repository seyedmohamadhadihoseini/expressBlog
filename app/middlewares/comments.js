exports.idValidation=(req,res,next)=>{
    let commentId = req.query.commentId;
    if ((!commentId) || (isNaN(commentId))) {
        res.send({
            message: "you must to specify the comment id",
            commentId,
            isTrue: !isNaN(commentId)
        });
        return;
    }

    next();
}