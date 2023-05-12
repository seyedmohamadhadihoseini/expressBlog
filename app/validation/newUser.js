const emailVaidator=require("email-validator");
exports.validate = (fullname,email, password) => {
    let errorMessages = [];

    if (fullname === "")
        errorMessages.push("اسم را کامل وارد کن")
    else if (emailVaidator.validate(email)==false)
        errorMessages.push("ایمیلت اشتباه وارد کردی");
    else if (password.length<=4)
        errorMessages.push("رمز عبور حداقل 5 کاراکتر داشته باشد")

    return errorMessages;
}
