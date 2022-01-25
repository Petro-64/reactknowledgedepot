import {reset} from 'redux-form';
import store from '../index.js';
import { put, takeLatest, all, takeEvery, call, delay } from 'redux-saga/effects';
import messages from '../translations/Comments';
import { createComment } from '../api/comment';

export function* postComment({comment, route}) {
    const translations = {
        commentSuccess:   messages[store.getState().settingsReducer.language].commenttSuccess,
        commenttError:  messages[store.getState().settingsReducer.language].commenttError,
    }
    
    try {
        yield put({ type: 'SET_OVERLAY_VISIBILITY', visibility: 1 });
        const responceData = yield call(createComment, {comment, route});
        if (responceData.data.payload.success == 'true'){
            yield all([
                put({ type: 'SET_OVERLAY_VISIBILITY', visibility: 0 }),
                put({ type: 'SET_FLASH_MESSAGES_MESSAGE_1', flashMessageMessage: translations.commentSuccess}),
                put({ type: 'SET_FLASH_MESSAGES_VISIBILITY', flashMessageVisibility: 1}),
            ])
            yield delay(3000);
            yield put({ type: 'SET_FLASH_MESSAGES_VISIBILITY', flashMessageVisibility: 0 });
        } else {
            yield all([
                put({ type: 'SET_OVERLAY_VISIBILITY', visibility: 0 }),
                put({ type: 'SET_FLASH_MESSAGES_MESSAGE_1', flashMessageMessage: translations.commenttError}),
                put({ type: 'SET_FLASH_MESSAGES_VISIBILITY', flashMessageVisibility: 1}),
            ])
            yield delay(3000);
            yield put({ type: 'SET_FLASH_MESSAGES_VISIBILITY', flashMessageVisibility: 0 });
        }
        yield  put (reset('addCommentFormRedux'));
     
    } catch(e) {
        yield  put (reset('addCommentFormRedux'));
        yield put({ type: 'SET_OVERLAY_VISIBILITY', visibility: 0 });
        yield all([
            put({ type: 'SET_FLASH_MESSAGES_MESSAGE_1', flashMessageMessage: translations.commenttError}),
            put({ type: 'SET_FLASH_MESSAGES_VISIBILITY', flashMessageVisibility: 1}),
        ])
        yield delay(2000);
        yield put({ type: 'SET_FLASH_MESSAGES_VISIBILITY', flashMessageVisibility: 0 });
    }
}


