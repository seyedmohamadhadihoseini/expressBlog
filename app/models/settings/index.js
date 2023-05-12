const db = require("@database/mysql");
exports.findAll=async (columns = [],condition=[])=>
{
    sqlcolumns=columns.length>0 ? columns.join(','):'*';
    sqlconditions=condition.length>0 ? condition.join(','):'1=1';
    const [result]=await db.query(`select ${sqlcolumns} from settings where ${sqlconditions}`);
    return result;
}
exports.update = async (updatedFields) => {
    for (const setting_name of Object.keys(updatedFields)) {
      await db.query(`UPDATE settings SET setting_value="${updatedFields[setting_name]}" WHERE setting_name="${setting_name}";`);
    }
    const [result] = await db.query("SELECT ROW_COUNT() AS affectedRows;");
    return result.affectedRows;
  };