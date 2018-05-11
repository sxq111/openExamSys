export const historyChangeActionCreater = (payload) => {
    return {
        type: type,
        payload
    }

}
export const historyChangeReducer = (prevState, action) => {

    console.log('his reducer',prevState);
    if (action.type === type) {
        return { ...prevState,...action.payload };
    }
    return { ...prevState }
}
const type = '===---HISTORYACTION---===';