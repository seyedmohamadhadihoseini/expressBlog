const db = require("@database/mysql");
const postEntity = require("@entities/Post");
exports.findAll = async () => {
    const [rows, fields] = await db.query(`
    select * from comments;
    `);
    return rows;
}
exports.findAuthorName = async (author_id) => {
    const [rows, fields] = await db.query(`SELECT fullName as authorName 
    FROM posts JOIN users ON ${author_id} = users.id;`)
    return (rows[0].authorName)
}
exports.SaveNewPost = async (post) => {
    const result = await db.query(`
    INSERT INTO posts set ?`,[post]);
    return result[0].affectedRows==1;
}
exports.remove=async(id)=>{
    const [result]=await db.query(`delete from comments where id=?`,[id]);
    return result;
}
exports.findOne=async(id)=>{
    const [result] = await db.query(`select * from posts where id=?`,[id]);
    return result[0];
}
exports.update=async(id,post)=>{
    const [result]=await db.query(`update posts set ? where id=?`,[post,id]);
    return result;
}
exports.set_status=async(status,id)=>{
    const [result]=await db.query("update comments set status=? where id=? limit 1",[status,id]);
    return result.affectedRows==1;
}