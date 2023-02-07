import { put, all, call, delay } from 'redux-saga/effects';
import { editQuestionPost, getQuestionsBySubjectAndStatus } from '../api/questions';


export function* postEditSearchQuestions({editedValues}) {
    try {
        yield put({ type: 'SET_OVERLAY_VISIBILITY', visibility: 1 });
        const responceData = yield call(editQuestionPost, {editedValues});
        if (responceData.data.payload.success === 'true'){
            if(editedValues.ifNeedToRedirectToSearch){ yield put({ type: 'SET_REDIRECT_FLAG_TO_BACK_TO_QUESTIONS_LIST', n: 3 }); }
            yield put({ type: 'SET_OVERLAY_VISIBILITY', visibility: 0 });
            yield all([
                put({ type: 'SET_FLASH_MESSAGES_MESSAGE_1', flashMessageMessage: 'success'}),
                put({ type: 'SET_FLASH_MESSAGES_VISIBILITY', flashMessageVisibility: 1}),
            ])
            yield delay(3000);
            yield put({ type: 'SET_FLASH_MESSAGES_VISIBILITY', flashMessageVisibility: 0 });
        } else {
            yield put({ type: 'SET_OVERLAY_VISIBILITY', visibility: 0 });
            yield all([
                put({ type: 'SET_FLASH_MESSAGES_MESSAGE_1', flashMessageMessage: 'error'}),
                put({ type: 'SET_FLASH_MESSAGES_VISIBILITY', flashMessageVisibility: 1}),
            ])
            yield delay(3000);
            yield put({ type: 'SET_FLASH_MESSAGES_VISIBILITY', flashMessageVisibility: 0 });
        }
    } catch (e){
        yield put({ type: 'SET_OVERLAY_VISIBILITY', visibility: 0 });
        yield all([
            put({ type: 'SET_FLASH_MESSAGES_MESSAGE_1', flashMessageMessage: 'error'}),
            put({ type: 'SET_FLASH_MESSAGES_VISIBILITY', flashMessageVisibility: 1}),
        ])
        yield delay(3000);
        yield put({ type: 'SET_FLASH_MESSAGES_VISIBILITY', flashMessageVisibility: 0 });
    }
}