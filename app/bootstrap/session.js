const session = require('express-session');
// const FileStore=require("session-file-store")(expSession);
const MySQLStore = require('express-mysql-session')(session);

const options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'hadi1379!',
    database: 'test'
};

const sessionStore = new MySQLStore(options);
module.exports=(app)=>{
    app.use(session({
        secret: "this is my love Zahra",
        resave: false,
        saveUninitialized: false,
        store:sessionStore,
        cookie: { secure: false }
    }));

}