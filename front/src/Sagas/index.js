import { put, takeEvery, all, take, call } from 'redux-saga/effects'
import actionTypes from '../ActionCreaters/actionTypes';
import { creaters } from '../ActionCreaters';
import axios from 'axios';
const CryptoJS = require("crypto-js");
const md5 = require('crypto-js/md5');
console.log('md5',md5('12345678195').toString())

const delay = (ms) => new Promise(res => setTimeout(res, ms))


//  function* getone() {
//     console.log('will getone')
//     yield delay(5000);
//     console.log('getone')
// }
// function* testTakeEvery() {
//     yield takeEvery(actionTypes.actiontype1, getone)
// }
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
        let { pwd, checkCode,id } = action.payload;
        var ciphertext = CryptoJS.AES.encrypt(pwd, checkCode);
        var ciphertextId = CryptoJS.AES.encrypt(id, checkCode);
        var { response, error } = yield call(AxiosPost('http://localhost:4396/newUserCreate',{
            id:id,
            pwd_cryptoed:ciphertext.toString()
        }));
        if (response) {
            console.log('response', response);
        } else {
            console.log('err', error);
            continue;
        }
    }
}
const allSagas = [register()];
//执行所有saga
export default function* rootSaga(getState) {
    yield all(allSagas)
}

const AxiosPost = (url, data) => {
    return () => {
        return axios.post(url, data)
            .then(response => ({ response }))
            .catch(error => ({ error }))
    }
}