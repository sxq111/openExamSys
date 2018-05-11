import { put, takeEvery, all, take, call } from 'redux-saga/effects'
import actionTypes from '../ActionCreaters/actionTypes';
import { creaters } from '../ActionCreaters';
import { AxiosPost, AxiosRequest } from '../network';
const CryptoJS = require("crypto-js");
const md5 = require('crypto-js/md5');

const delay = (ms) => new Promise(res => setTimeout(res, ms))

function* register() {
    while (true) {
        let action = yield take(actionTypes.getCheckCode);
        var { response, error } = yield call(AxiosPost('http://localhost:4396/newUserPrepare', action.payload));
        if (response) {
            yield put(creaters.typeInCheckCode())
        } else {
            continue;
        }
        action = yield take(actionTypes.sendCryptoToServe);
        let { pwd, checkCode, id } = action.payload;
        var ciphertext = CryptoJS.AES.encrypt(pwd, checkCode);
        var ciphertextId = CryptoJS.AES.encrypt(id, checkCode);
        var { response, error } = yield call(AxiosPost('http://localhost:4396/newUserCreate', {
            id: id,
            pwd_cryptoed: ciphertext.toString(),
            id_cryptoed: ciphertextId.toString()
        }));
        if (response) {
            console.log('response', response);
            yield put(creaters.toLogin());
        } else {
            console.log('err', error);
            continue;
        }
    }
}
function* refreshToLogin() {
    while (true) {
        yield take(actionTypes.toLogin);
        window.location.pathname = 'login';
    }
}
function* login() {
    while (true) {
        let action = yield take(actionTypes.requestLogin);
        let minutes = Date.now()/(1000*60);
        let { id, pwd } = action.payload;
        var { response, error } = yield call(AxiosRequest('get','http://localhost:4396/getsalt?id='+id,{}));
        // var { response, error } = yield call(AxiosPostWithAuth('http://localhost:4396/loginPrepare',{},{
        //     id:id,
        //     pwd_cry:md5(pwd + minutes).toString()
        // }));
        if (response) {
            console.log('response', response);
        } else {
            console.log('err', error);
            continue;
        }
    }
}
const allSagas = [register(), refreshToLogin(), login()];
//执行所有saga
export default function* rootSaga(getState) {
    yield all(allSagas)
}

