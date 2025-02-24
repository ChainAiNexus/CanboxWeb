import {createStore,compose,applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducer'; // 
import rootSaga from './saga/index';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
const store = createStore(
    reducer,
    compose(applyMiddleware(...middlewares))
); // 
sagaMiddleware.run(rootSaga);
export default store;