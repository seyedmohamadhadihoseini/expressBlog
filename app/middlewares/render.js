module.exports = app => {
    app.use((req,res,next)=>{
        
        res.newRender=(template,options)=>{
            options = { ...options, user: req.session.user };
            res.render(template,options);
        };
        next();
    });  
    
};