import { put, call } from 'redux-saga/effects';
import { postdeleteMistake } from '../api/postdeleteMistake';
import { getMistakes } from '../api/mistakes';
import { showHideSpinnerAndMessage } from './sagaUtilities';

export function* postdeleteMistakeSaga({questionId}){
    try {
        yield put({ type: 'SET_OVERLAY_VISIBILITY', visibility: 1 });
        const responceData = yield call(postdeleteMistake, {questionId});
        if (responceData.data.payload.success === 'true'){
            const responceData = yield call(getMistakes);
            if (responceData.data.payload.success === 'true'){
                yield put({ type: 'SET_MISTAKES',  mistakes: responceData.data.payload.mistakes });
                yield showHideSpinnerAndMessage(0, 'success', 1, 'success'); 
            } else {
                yield showHideSpinnerAndMessage(0, 'error mistakes retrieving', 1, 'error');
            } 
        } else {
            yield showHideSpinnerAndMessage(0, 'error mistakes retrieving', 1, 'error');
        } 
    } catch(e) {
        yield showHideSpinnerAndMessage(0, 'error', 1, 'error');
    }
}