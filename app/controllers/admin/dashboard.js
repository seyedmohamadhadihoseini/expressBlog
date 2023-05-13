const statistics=require("@models/statistics");
exports.index=async (req, res)=>{

    data={
        totalUser:await statistics.totalUsers(),
        totalView:await statistics.totalViews(),
        totalComment:await statistics.totalComments(),
        totalPost:await statistics.totalPosts()

    }
    res.newRender("admin/dashboard/index", {
        layout: "admin",...data
    });
};

