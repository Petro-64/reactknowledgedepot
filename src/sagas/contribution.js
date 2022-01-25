import {reset} from 'redux-form';
import store from '../index.js';
import { put, takeLatest, all, takeEvery, call, delay } from 'redux-saga/effects';
import messages from '../translations/Contribution';
import { sendContributionSaga } from '../api/contribution';


export function* postContribution({question, firstAnswer, secondAnswer, thirdAnswer, fourthAnswer, subjectId}){
    const translations = {
        addSuccess:   messages[store.getState().settingsReducer.language].addSuccess,
        addError: messages[store.getState().settingsReducer.language].addError,
    }
    
    try {
        yield put({ type: 'SET_OVERLAY_VISIBILITY', visibility: 1 });
        const responceData = yield call(sendContributionSaga, {question, firstAnswer, secondAnswer, thirdAnswer, fourthAnswer, subjectId});
        if (responceData.data.payload.success == 'true'){
            yield  put (reset('addContibutionFormRedux'));
            yield all([
                put({ type: 'SET_OVERLAY_VISIBILITY', visibility: 0 }),
                put({ type: 'SET_FLASH_MESSAGES_MESSAGE_1', flashMessageMessage: translations.addSuccess}),
                put({ type: 'SET_FLASH_MESSAGES_VISIBILITY', flashMessageVisibility: 1}),
            ])
            yield delay(3000);
            yield put({ type: 'SET_FLASH_MESSAGES_VISIBILITY', flashMessageVisibility: 0 });
        } else {
            yield  put (reset('addContibutionFormRedux'));
            yield all([
                put({ type: 'SET_OVERLAY_VISIBILITY', visibility: 0 }),
                put({ type: 'SET_FLASH_MESSAGES_MESSAGE_1', flashMessageMessage: translations.addError}),
                put({ type: 'SET_FLASH_MESSAGES_VISIBILITY', flashMessageVisibility: 1}),
            ])
            yield delay(3000);
            yield put({ type: 'SET_FLASH_MESSAGES_VISIBILITY', flashMessageVisibility: 0 });
        }
    } catch(e) {
        yield all([
            put({ type: 'SET_OVERLAY_VISIBILITY', visibility: 0 }),
            put({ type: 'SET_FLASH_MESSAGES_MESSAGE_1', flashMessageMessage: translations.addError}),
            put({ type: 'SET_FLASH_MESSAGES_VISIBILITY', flashMessageVisibility: 1}),
        ])
        yield delay(2000);
        yield put({ type: 'SET_FLASH_MESSAGES_VISIBILITY', flashMessageVisibility: 0 });
    }
}
