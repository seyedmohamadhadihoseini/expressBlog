const postStatus={
    DRAFT:0,
    REVIEW:1,
    PUBLISHED:2
};
exports.status=postStatus;

exports.persianStatus={
    0:'پیش نویس ',
    [postStatus.REVIEW]:'در انتظار بررسی',
    [postStatus.PUBLISHED]:'منتشر شده',
}