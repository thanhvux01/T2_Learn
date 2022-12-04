 const DateOfNow = () => {
    const date = new Date();
    const currentDate = date.getUTCDate();
    const currentMonth = date.getUTCMonth() + 1;
    const currentYear = date.getUTCFullYear();
    return new Date(currentYear + "-" + currentMonth + "-" + currentDate);
}
const DateOfNowString = () => {
    const date = new Date();
    const currentDate = date.getUTCDate();
    const currentMonth = date.getUTCMonth() + 1;
    const currentYear = date.getUTCFullYear();
    return (currentYear + "-" + currentMonth + "-" + currentDate);
}

module.exports = {DateOfNow,DateOfNowString};