import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { historyChangeActionCreater, historyChangeReducer } from './historyBindStore';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './Sagas';
import actionTypes from './ActionCreaters/actionTypes' ;

const sagaMiddleware = createSagaMiddleware();
const reducer = combineReducers({
    location: historyChangeReducer,
    fatherField:combineReducers({
        childField:(prevSate,action)=>{
            if(action.type===actionTypes.actiontype1)
            return 'xxxxx'
            else 
            return null;
        }
    })
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