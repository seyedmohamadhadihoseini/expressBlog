const persianDateService = require("@services/dateServices");
const langService = require("@services/langService");
const userStatus = require("@models/users/status");
exports.present=(users)=>{
    const persentaedUsers=users.map(user=>{
        user.role=userStatus.userStatus[user.role];
        user.created_at_persian = langService.toPersianNumber(persianDateService.toPersianDate(user.created_at, "dddd DD MMMM YYYY    - HH:mm:ss"));
        
        return user;
    })
    return users;
}
