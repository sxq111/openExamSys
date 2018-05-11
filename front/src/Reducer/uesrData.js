import { combineReducers } from 'redux';
import actionTypes from '../ActionCreaters/actionTypes';

export default function (prevState, action) {
    switch (action.type) {
        case actionTypes.saveUserData:
            return action.payload
        default:
            return {...prevState};
    }
}