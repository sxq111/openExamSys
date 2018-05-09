import actionCreaterFactory  from './actionCreaterFactory';
import actionTypes from './actionTypes';

export const creaters = {
    getCheckCode:actionCreaterFactory(actionTypes.getCheckCode),
    typeInCheckCode:actionCreaterFactory(actionTypes.typeInCheckCode),
    sendCryptoToServe:actionCreaterFactory(actionTypes.sendCryptoToServe)
}