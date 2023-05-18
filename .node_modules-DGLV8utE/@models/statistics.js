const db=require("../../database/mysql");
exports.totalUsers=async ()=>{
    const [result]= await db.query("select count(id) as totalUsers  from users");
    return(result[0].totalUsers)
}
exports.totalViews=async()=>{
    const [result]=await db.query("select sum(views) as totalViews from posts");
    // console.log(result[0])
    return result[0].totalViews;
}
exports.totalPosts=async()=>{
    const [result]=await db.query("select count(id) as totalPosts from posts");
    // console.log(result[0])
    return result[0].totalPosts;
}
exports.totalComments=async()=>{
    const [result]=await db.query("select count(id) as totalComments from comments");
    // console.log(result[0])
    return result[0].totalComments;
}