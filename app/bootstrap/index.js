const express = require('express');
const exphbs = require('express-handlebars');


const path = require('path');
var livereload = require("livereload");
var connectLiveReload = require("connect-livereload");
module.exports=(app)=>{
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    require("./session")(app);
    
    const liveReloadServer = livereload.createServer();
    liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
    });
    app.use(connectLiveReload());
    var hbs = exphbs.create({
        helpers: {
            eq: function (a,b) {
                return a===b;
            }
        },
    });
    app.engine('handlebars', hbs.engine);
    app.set('view engine', 'handlebars');
    app.set('views', path.join(__dirname,"../views"));
    app.use('/static',express.static(path.join(__dirname,"../../public")));
}
