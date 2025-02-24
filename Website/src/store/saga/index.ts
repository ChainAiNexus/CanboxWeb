
import {put,takeEvery} from 'redux-saga/effects';
import {reducerParameterType,BEFOREADDMESSAGE,ADDMESSAGE,DELMESSAGE,message} from '../actions'

function * AddMessage(action:reducerParameterType){
    yield put({type:ADDMESSAGE, value:action.value})
    yield new Promise<void> ((res)=>{
        setTimeout(() => {
            res()
        }, 3000);
    })
    // console.log(action.value)
    yield put({type:DELMESSAGE, value:(action.value as message).index})
}
export default function* rootSaga() {
    yield  takeEvery(BEFOREADDMESSAGE, AddMessage)
}