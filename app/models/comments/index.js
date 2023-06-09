const db = require("@database/mysql");
const postEntity = require("@entities/Post");
exports.findAll = async (columns = [], condition = []) => {
    sqlcolumns =columns.length > 0 ? columns.join(',') : '*';
    
    sqlconditions = condition.length > 0 ? condition.join(',') : '1=1';
    const [result] = await db.query(`select ${sqlcolumns} from comments where ${sqlconditions}`);
    return result;
}
exports.findAuthorName = async (author_id) => {
    const [rows, fields] = await db.query(`SELECT fullName as authorName 
    FROM posts JOIN users ON ${author_id} = users.id;`)
    return (rows[0].authorName)
}
exports.store = async (post) => {
    const result = await db.query(`
    INSERT INTO comments set ?`,[post]);
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