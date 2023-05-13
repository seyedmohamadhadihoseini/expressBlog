const db = require("@database/mysql");
const bcryptService=require("@services/bcryptService");
exports.findUsers=async (columns = [],condition=[])=>
{
    sqlcolumns=columns.length>0 ? columns.join(','):'*';
    sqlconditions=condition.length>0 ? condition.join(','):'';
    const [result]=await db.query(`select ${sqlcolumns} from users ${sqlconditions}`);
    return result;
}
exports.findOne=async(id)=>{
    const [result]=await db.query("select * from users where id=? limit 1",[id]);
    return result[0];
}
exports.removeuser=async(id)=>{
    const [result] = await db.query("delete from users where id=? limit 1", [id]);
    console.log(result)
    return true;
}
exports.SaveNewuser=async(user)=>{
    const hashedPassword=bcryptService.hash(user.password);
    const changedUser={...user,password:hashedPassword};
    const [result]=await db.query(`insert into users set ?`,[changedUser]);
    return true;
}
exports.findUserByEmail=async(email)=>{

    const [result]=await db.query(`select * from users where email=?`,[email]);
    if(result[0])
    {
        return result[0];
    }
    
    return null;
}