const db = require("@database/mysql");
const postEntity = require("@entities/Post");
exports.findAll = async () => {
    const [rows, fields] = await db.query(`
    select p.* , u.fullName from 
    posts p join users u 
    on p.author_id=u.id 
    order by p.id;
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
exports.removePost=async(id)=>{
    const [result]=await db.query(`delete from posts where id=?`,[id]);
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