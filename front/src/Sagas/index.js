import { put, takeEvery, all } from 'redux-saga/effects'
import actionTypes from '../ActionCreaters/actionTypes';

const delay = (ms) => new Promise(res => setTimeout(res, ms))


export function* getone() {
    console.log('will getone')
    yield delay(5000);
    console.log('getone')
}
function* testTakeEvery() {
    yield takeEvery(actionTypes.actiontype1, getone)
}
const allSagas = [testTakeEvery()];
//执行所有saga
export default function* rootSaga(getState) {
    console.log('getState',getState);
    yield all(allSagas)
}