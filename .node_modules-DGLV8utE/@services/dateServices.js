var persianDate = require('persian-date');
exports.toPersianDate = (date, format) => {
    return new persianDate(date).format(format);
}