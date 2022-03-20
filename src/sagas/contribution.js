import {reset} from 'redux-form';
import store from '../index.js';
import { put, call } from 'redux-saga/effects';
import messages from '../translations/Contribution';
import { sendContributionSaga } from '../api/contribution';
import { showHideSpinnerAndMessage } from './sagaUtilities';


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
            yield showHideSpinnerAndMessage(0, translations.addSuccess, 1, 'success'); 
        } else if (responceData.data.payload.success == 'false' && responceData.data.payload.message == 'ratelimiter issue'){
            yield  put (reset('addContibutionFormRedux'));
            yield showHideSpinnerAndMessage(0, errorMessage, 1, 'error');
        } else {
            yield  put (reset('addContibutionFormRedux'));
            yield showHideSpinnerAndMessage(0, translations.addError, 1, 'error');
        }
    } catch(e) {
        yield showHideSpinnerAndMessage(0, translations.addError, 1, 'error');
    }
}
