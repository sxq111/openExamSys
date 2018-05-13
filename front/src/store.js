import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { historyChangeActionCreater, historyChangeReducer } from './historyBindStore';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './Sagas';
import actionTypes from './ActionCreaters/actionTypes' ;
import regeisterReducer from './Reducer/regeister';
import userDataReducer from './Reducer/uesrData'; 
import messageReducer from './Reducer/message';

const sagaMiddleware = createSagaMiddleware();
const reducer = combineReducers({
    location: historyChangeReducer,
    regeister:regeisterReducer,
    userData:userDataReducer,
    message:messageReducer
});
const store = createStore(reducer,
    {},
    composeWithDevTools(
        applyMiddleware(sagaMiddleware)
    )
);
sagaMiddleware.run(rootSaga)
export const historyChangeListener = (location) => {
    console.log('dispatch')
    store.dispatch(historyChangeActionCreater(location))
}

export default store;