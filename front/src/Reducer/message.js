import { combineReducers } from 'redux';
import actionTypes from '../ActionCreaters/actionTypes';

export default function (prevState = {messageList : []}, action) {
    console.log(action,prevState)
    switch (action.type) {
        case actionTypes.createInformation:
            var messageList = prevState.messageList || [];
            messageList.push({ ...action.payload, key: messageList.length, show: true });
            return {
                messageList: [...messageList]
            }
        case actionTypes.setMessageVisiblity:
            let {key,visible} = action.payload;
            var messageList = prevState.messageList || [];
            let item = messageList.find(ele=>{
                return ele.key === key;
            });
            item.show = visible;
            return{
                messageList: [...messageList]
            }
        default:
            return {
                ...prevState
            }
    }
}