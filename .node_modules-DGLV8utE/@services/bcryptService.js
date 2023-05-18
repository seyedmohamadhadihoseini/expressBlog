const bcrypt=require("bcrypt");

exports.hash=plainTextPassword=>{
    return bcrypt.hashSync(plainTextPassword,10);
}
exports.compare=(plainTextPassword,hashedPassword)=>{
    return bcrypt.compareSync(plainTextPassword,hashedPassword);
}