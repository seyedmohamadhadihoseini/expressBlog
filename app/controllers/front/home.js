const postModel=require("@models/posts");
const postPresent=require("@presentation/posts");
const settingModel = require("@models/settings");
exports.index=async(req,res)=>{
    let [postPerPage] = await settingModel.findAll(["setting_value"],["setting_name='postsperpage'"]);
    postPerPage=postPerPage.setting_value;
    const totalPagesCount=Math.ceil((await postModel.count())/postPerPage);
    let currentPage="page" in req.query ? parseInt(req.query.page):1;
    if(currentPage>totalPagesCount)
    {
        return res.redirect(`/?page=1`)
    }
    const pagination={
        currentPage,
        totalPagesCount,
        nextPage:currentPage<totalPagesCount?currentPage+1:1,   
        previousPage:currentPage>1?currentPage-1:totalPagesCount
    }
    
    const offset=(currentPage-1)*postPerPage;
    const posts=await postModel.findAll(offset,postPerPage);
    const presentPosts = posts.map(post => {
        return postPresent.present(post);
    });
    res.frontRender("front/home/index",{posts:presentPosts,pagination});
}