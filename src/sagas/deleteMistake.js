import { put, call } from 'redux-saga/effects';
import { deleteMistake } from '../api/deleteMistake';
import { getMistakes } from '../api/mistakes';
import { showHideSpinnerAndMessage } from './sagaUtilities';

export function* deleteMistakeSaga(payload){
    console.log("payload", payload);
    try {
        const responceData = yield call(deleteMistake(payload.id.id, payload.userId));
        console.log("responceData = ", responceData);
        //console.log("responceData = ", responceData);
        const responceData1 = yield call(getMistakes);
        // if (responceData.data.payload.success === 'true'){
        //     console.log("delete successfull");
        //     const responceData = yield call(getMistakes);
        //     if (responceData.data.payload.success === 'true'){
        //         yield put({ type: 'SET_MISTAKES',  mistakes: responceData.data.payload.mistakes });
        //     } else {
        //         yield showHideSpinnerAndMessage(0, 'error mistakes retrieving', 1, 'error');
        //     } 
        // } else {
        //     yield showHideSpinnerAndMessage(0, 'error mistakes retrieving', 1, 'error');
        // } 
    } catch(e) {
        yield showHideSpinnerAndMessage(0, 'error', 1, 'error');
    }
}