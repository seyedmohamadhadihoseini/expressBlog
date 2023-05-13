const emailCheck=require("@services/authService");
module.exports= async(iRegister)=>{
    let errMessages=[];
    if (await emailCheck.isEmailExists(iRegister.email)){
        errMessages.push("این ایمیل کاربری قبلا ثبت شده است");
    }
    if (iRegister.password != iRegister.password_confirmation){
        errMessages.push("رمز عبور و تایید اون را یکسان وارد نکردید");
    }
    if(iRegister.password.length<5){
        errMessages.push("طول رمز عبور نباید کمتر از 5 باشد");
    }
    if(!iRegister.fullname){
        errMessages.push("لطفا اسم خودتان را وارد کنید");
    }
    return errMessages;
}