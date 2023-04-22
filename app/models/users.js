const db = require("@database/mysql");

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