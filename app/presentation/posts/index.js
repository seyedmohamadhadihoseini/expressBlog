const persianDateService = require("@services/dateServices");
const langService = require("@services/langService");

exports.present=(post)=>{
    post.created_at_persian = langService.toPersianNumber(persianDateService.toPersianDate(post.created_at, "dddd DD MMMM YYYY    - HH:mm:ss"));
    post.views_persian = langService.toPersianNumber(post.views);
    return post;
}
