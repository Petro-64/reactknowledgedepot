import {reset} from 'redux-form';
import store from '../index.js';
import { put, takeLatest, all, takeEvery, call, delay } from 'redux-saga/effects';
import messages from '../translations/Contribution';
import { sendContributionSaga } from '../api/contribution';


export function* postContribution({question, firstAnswer, secondAnswer, thirdAnswer, fourthAnswer, subjectId}){
    const translations = {
        addSuccess:   messages[store.getState().settingsReducer.language].addSuccess,
        addError: messages[store.getState().settingsReducer.language].addError,
        maximumNumberOfContributions:  messages[store.getState().settingsReducer.language].maximumNumberOfContributions,
        perDay:  messages[store.getState().settingsReducer.language].perDay,
    }
    
    const rateLimiters = {
        number:   store.getState().contributionsReducer.contributionRateLimiterQuantity,
    }

    const errorMessage = translations.maximumNumberOfContributions + ' ' + rateLimiters.number + translations.perDay

    try {
        yield put({ type: 'SET_OVERLAY_VISIBILITY', visibility: 1 });
        const responceData = yield call(sendContributionSaga, {question, firstAnswer, secondAnswer, thirdAnswer, fourthAnswer, subjectId});
        if (responceData.data.payload.success == 'true'){
            yield  put (reset('addContibutionFormRedux'));
            yield all([
                put({ type: 'SET_OVERLAY_VISIBILITY', visibility: 0 }),
                put({ type: 'SET_MUI_FLASH_MESSAGES_MESSAGE', muiFlashMessageMessage: translations.addSuccess}),
                put({ type: 'SET_MUI_FLASH_MESSAGES_VISIBILITY', muiFlashMessageVisibility: 1}),
                put({ type: 'SET_MUI_FLASH_MESSAGES_TYPE', muiFlashMessageType: 'success'}),
            ])
            yield delay(3000);
            yield put({ type: 'SET_MUI_FLASH_MESSAGES_VISIBILITY', muiFlashMessageVisibility: 0});
        } else if (responceData.data.payload.success == 'false' && responceData.data.payload.message == 'ratelimiter issue'){
            yield  put (reset('addContibutionFormRedux'));
            yield all([
                put({ type: 'SET_OVERLAY_VISIBILITY', visibility: 0 }),
                put({ type: 'SET_MUI_FLASH_MESSAGES_TYPE', muiFlashMessageType: 'error'}),
                put({ type: 'SET_MUI_FLASH_MESSAGES_VISIBILITY', muiFlashMessageVisibility: 1}),
                put({ type: 'SET_MUI_FLASH_MESSAGES_MESSAGE', muiFlashMessageMessage: errorMessage}),
            ])
            yield delay(3000);
            yield put({ type: 'SET_MUI_FLASH_MESSAGES_VISIBILITY', muiFlashMessageVisibility: 0});
        } else {
            yield  put (reset('addContibutionFormRedux'));
            yield all([
                put({ type: 'SET_OVERLAY_VISIBILITY', visibility: 0 }),
                put({ type: 'SET_MUI_FLASH_MESSAGES_TYPE', muiFlashMessageType: 'error'}),
                put({ type: 'SET_MUI_FLASH_MESSAGES_VISIBILITY', muiFlashMessageVisibility: 1}),
                put({ type: 'SET_MUI_FLASH_MESSAGES_MESSAGE', muiFlashMessageMessage: translations.addError}),
            ])
            yield delay(3000);
            yield put({ type: 'SET_MUI_FLASH_MESSAGES_VISIBILITY', muiFlashMessageVisibility: 0});
        }
    } catch(e) {
        yield all([
            put({ type: 'SET_OVERLAY_VISIBILITY', visibility: 0 }),
            put({ type: 'SET_MUI_FLASH_MESSAGES_VISIBILITY', muiFlashMessageVisibility: 1}),
            put({ type: 'SET_MUI_FLASH_MESSAGES_TYPE', muiFlashMessageType: 'error'}),
            put({ type: 'SET_MUI_FLASH_MESSAGES_MESSAGE', muiFlashMessageMessage: translations.addError}),
        ])
        yield delay(2000);
        yield put({ type: 'SET_MUI_FLASH_MESSAGES_VISIBILITY', muiFlashMessageVisibility: 0});
    }
}
