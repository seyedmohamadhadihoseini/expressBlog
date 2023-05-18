module.exports = app => {
    app.use((req,res,next)=>{
        
        res.newRender=(template,options)=>{
            options = { ...options, user: req.session.user };
            res.render(template,options);
        };
        res.frontRender=(template,options)=>{
            options = { ...options, layout:'front' };
            res.render(template,options);
        }
        next();
    });  

    
};