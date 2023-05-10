const persianDateService = require("@services/dateServices");
const langService = require("@services/langService");

exports.present=(user)=>{
    user.created_at_persian = langService.toPersianNumber(persianDateService.toPersianDate(user.created_at, "dddd DD MMMM YYYY    - HH:mm:ss"));
    user.views_persian = langService.toPersianNumber(user.views);
    return user;
}
