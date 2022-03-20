import {reset} from 'redux-form';
import store from '../index.js';
import { put, call } from 'redux-saga/effects';
import messages from '../translations/Comments';
import { createComment } from '../api/comment';
import { showHideSpinnerAndMessage } from './sagaUtilities';

export function* postComment({comment, route}) {// route is the page url to store to be able to identify page
    const translations = {
        commentSuccess:   messages[store.getState().settingsReducer.language].commenttSuccess,
        commenttError:  messages[store.getState().settingsReducer.language].commenttError,
        maximumNumberOfComments:  messages[store.getState().settingsReducer.language].maximumNumberOfComments,
        perDay:  messages[store.getState().settingsReducer.language].perDay,
    }

    const rateLimiters = {
        number:   store.getState().commentsReducer.commentRateLimiterQuantity,
    }
    
    const errorMessage = translations.maximumNumberOfComments + ' ' + rateLimiters.number + translations.perDay

    try {
        yield put({ type: 'SET_OVERLAY_VISIBILITY', visibility: 1 });
        const responceData = yield call(createComment, {comment, route});
        if (responceData.data.payload.success == 'true'){
            yield showHideSpinnerAndMessage(0, translations.commentSuccess, 1, 'success'); 
        } else if (responceData.data.payload.success == 'false' && responceData.data.payload.message == 'ratelimiter issue'){
            yield showHideSpinnerAndMessage(0, errorMessage, 1, 'error');
        } else {
            yield showHideSpinnerAndMessage(0, translations.commenttError, 1, 'error');
        }
        yield  put (reset('addCommentFormRedux'));
    } catch(e) {
        yield put(reset('addCommentFormRedux'));
        yield showHideSpinnerAndMessage(0, translations.commenttError, 1, 'error');
    }
}


