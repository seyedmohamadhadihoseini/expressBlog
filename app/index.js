const express=require("express");
const app=express();

require("./bootstrap")(app);
require("./routes/index")(app);


module.exports=()=>{
    const port=process.env.APP_PORT;
    app.listen(port,(err)=>{
        if(err)
        {
            console.log(err);
            return;
        }
        
        console.log(`app successfully run on port ${port}`);
    })
}