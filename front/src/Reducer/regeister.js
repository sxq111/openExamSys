import { combineReducers } from 'redux';
import actionTypes from '../ActionCreaters/actionTypes';

export default function (prevState, action) {
    switch (action.type) {
        case actionTypes.typeInCheckCode:
            return {
                ...prevState,
                showCheckCodeInput: true
            }
        default:
            return {
                ...prevState
            }
    }
}