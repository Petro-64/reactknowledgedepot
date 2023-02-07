import { put, call } from 'redux-saga/effects';
import { getMistakes } from '../api/mistakes';
import { showHideSpinnerAndMessage } from './sagaUtilities';

export function* getMistakesSaga(){
    try {
        const responceData = yield call(getMistakes);
        if (responceData.data.payload.success === 'true'){
            yield put({ type: 'SET_MISTAKES',  mistakes: responceData.data.payload.mistakes });
        } else {
            yield showHideSpinnerAndMessage(0, 'error mistakes retrieving', 1, 'error');
        } 
    } catch(e) {
        yield showHideSpinnerAndMessage(0, 'error', 1, 'error');
    }
}