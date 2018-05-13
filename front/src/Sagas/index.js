import { put, takeEvery, all, take, call } from 'redux-saga/effects'
import actionTypes from '../ActionCreaters/actionTypes';
import { creaters } from '../ActionCreaters';
import { AxiosPost, AxiosRequest } from '../network';
import {getHistory} from '../historyHelper';

const CryptoJS = require("crypto-js");
const md5 = require('crypto-js/md5');

function* register() {
    while (true) {
        let action = yield take(actionTypes.getCheckCode);
        var { response, error } = yield call(AxiosPost('http://localhost:4396/newUserPrepare', action.payload));
        if (response) {
            yield put(creaters.typeInCheckCode());
            yield put(creaters.createInformation({message:'邮件已经发送，请查看',type:'success'}));
        } else {
            yield put(creaters.createInformation({message:'请求失败',type:'fail'}));
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
            yield put(creaters.createInformation({message:'注册成功',type:'success'}));
            yield put(creaters.toLogin());
        } else {
            yield put(creaters.createInformation({message:'注册失败',type:'fail'}));
            continue;
        }
    }
}
function* refreshToLogin() {
    while (true) {
        yield take(actionTypes.toLogin);
        // window.location.pathname = 'login';
        getHistory().push('/login');
    }
}
function* login() {
    while (true) {
        let action = yield take(actionTypes.requestLogin);
        let minutes = Math.floor(Date.now() / (1000 * 60));
        let { id, pwd } = action.payload;
        var { response, error } = yield call(AxiosRequest('get', 'http://localhost:4396/getsalt?id=' + id, {}));
        let salt = null;
        if (response) {
            salt = response.data.salt;
        } else {
            console.log('err', error);
            continue;
        }
        let pwdCry = md5(pwd + salt).toString();
        var { response, error } = yield call(AxiosRequest('post', 'http://localhost:4396/loginPrepare', {}, {
            id: id,
            token: md5(pwdCry + minutes)
        }));
        console.log(minutes);
        if (response) {
            if (response.data.success) {
                yield put(creaters.saveUserData({ id, pwd_cryptoed: pwdCry }));
                yield put(creaters.createInformation({message:'登录成功',type:'success'}));
                // console.log(HistoryHelper);
                // setTimeout(()=>{
                getHistory().push('/test');
                // },3000) 
            }
        } else {
            console.log('err', error);
            yield put(creaters.createInformation({message:'登录失败',type:'fail'}));
            continue;
        }
    }
}

function* handleMessage() {

}

const allSagas = [register(), refreshToLogin(), login()];
//执行所有saga
export default function* rootSaga(getState) {
    yield all(allSagas)
}

