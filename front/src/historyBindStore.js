export const historyChangeActionCreater = (payload) => {
    return {
        type: type,
        payload
    }

}
export const historyChangeReducer = (prevState, action) => {
    // console.log('his reducer');
    if (action.type === type) {
        return { ...action.payload };
    }
    return { ...prevState }
}
const type = '===---HISTORYACTION---===';