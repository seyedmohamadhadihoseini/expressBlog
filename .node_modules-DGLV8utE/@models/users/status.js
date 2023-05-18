const userStatus = [
    'کاربری',
    'نویسنده',
    'مدیر'
]
const enUserRoles={
    USER:0,WRITER:1,ADMIN:2
};
exports.userRoles=enUserRoles;
exports.userStatus=userStatus;
exports.toNumber = (status) => {
    let i = 0;
    console.log("the status is ",status);
    while (i < 3) {
        if (userStatus[i] == status) {
            return i;
        }
        i++;
    }
    console.log("i am in error ");
    throw console.error('status value is not in true format');

    
}