const mysql2 = require('mysql2');
const connection=mysql2.createConnection({
    host:process.env.MYSQL_HOST,
    user:process.env.MYSQL_USER,
    password:process.env.MYSQL_PASSWORD,
    port:process.env.MYSQL_PORT,
    database:process.env.MYSQL_DATABASE,
    
    
});

module.exports=connection.promise();
