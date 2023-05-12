const userStatus = [
    'کاربری',
    'نویسنده',
    'مدیر'
]
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