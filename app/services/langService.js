exports.toPersianNumber= function toFarsiNumber(n) {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return n
        .toString()
        .replace(/\\d/g, x => farsiDigits[x]);
}