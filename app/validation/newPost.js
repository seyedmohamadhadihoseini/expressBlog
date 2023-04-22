exports.validate = (title, slug, content) => {
    let errorMessages = [];

    if (title === "")
        errorMessages.push("لطفا عنوان وارد کنید")
    else if (title.length <= 3)
        errorMessages.push("عنوان حداقل چهار حرفی باشد");
    if (slug === "")
        errorMessages.push("لطفا نامک وارد کنید")
    else if(! isNaN(slug.substr(0,1)))
        errorMessages.push("اسلاک نمیتواند با عدد شروع شود")
    if (content === "")
        errorMessages.push("لطفا محتوا وارد کنید")

    
    return errorMessages;
}
