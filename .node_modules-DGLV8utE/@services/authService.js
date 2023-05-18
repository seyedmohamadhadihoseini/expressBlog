const userModel=require("@models/users/index");
const hashService=require("@services/bcryptService");
exports.login=async(email,plainPassword)=>{
    const user=await userModel.findUserByEmail(email);
    if(!user)
    {
        return false;
    }
    console.log(user);
    return hashService.compare(plainPassword,user.password)?user:false;
}
exports.isEmailExists=async(email)=>{
    const user = await userModel.findUserByEmail(email);
    if (!user) {
        return false;
    }
    return true;
}