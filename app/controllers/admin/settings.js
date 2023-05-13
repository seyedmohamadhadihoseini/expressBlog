const settingModel = require("@models/settings");
exports.index = async (req, res) => {
    const configs = await settingModel.findAll();
    const represnetConfig = {};
    configs.forEach(item => {
        represnetConfig[item.setting_name] = item.setting_value;
    });
    // console.log(represnetConfig)
    res.newRender("admin/settings/", {
        layout: "admin", configs:represnetConfig
    });
};
exports.store = async (req, res) => {
    const message = req.body;
    message["can-everyone-register"] = "can-everyone-register" in message ? 1 : 0;
    message["user-can-comments"] = "user-can-comments" in message ? 1 : 0;

    await settingModel.update(message);
    res.redirect("/admin/settings");
}