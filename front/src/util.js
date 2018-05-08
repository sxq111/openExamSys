export const getValuesFromObj = (obj) => {
    return Object.keys(obj).map(k => {
        return obj[k];
    });
}
export function unixToYYYYMD(num) {
    let time = new Date(num);
    return time.getFullYear() + '年' +
        (time.getMonth() + 1) + '月' +
        time.getDate() + '日' + ' ' + time.getHours() + '时' + time.getMinutes() + '分'
}