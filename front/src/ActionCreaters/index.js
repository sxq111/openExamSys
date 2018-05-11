import actionCreaterFactory  from './actionCreaterFactory';
import actionTypes from './actionTypes';

export const creaters=Object.keys(actionTypes).reduce((prevSet,type)=>{
    prevSet[''+type] = actionCreaterFactory(actionTypes[type]);
    return prevSet;
},{});
