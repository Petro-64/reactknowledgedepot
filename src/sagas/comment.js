import {reset} from 'redux-form';
import store from '../index.js';
import { put, takeLatest, all, takeEvery, call, delay } from 'redux-saga/effects';
import messages from '../translations/Comments';
import { createComment } from '../api/comment';

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
            yield all([
                put({ type: 'SET_OVERLAY_VISIBILITY', visibility: 0 }),
                put({ type: 'SET_MUI_FLASH_MESSAGES_MESSAGE', muiFlashMessageMessage: translations.commentSuccess}),
                put({ type: 'SET_MUI_FLASH_MESSAGES_VISIBILITY', muiFlashMessageVisibility: 1}),
                put({ type: 'SET_MUI_FLASH_MESSAGES_TYPE', muiFlashMessageType: 'success'}),
            ])
            yield delay(3000);
            yield put({ type: 'SET_MUI_FLASH_MESSAGES_VISIBILITY', muiFlashMessageVisibility: 0});
        } else if (responceData.data.payload.success == 'false' && responceData.data.payload.message == 'ratelimiter issue'){
            yield all([
                put({ type: 'SET_OVERLAY_VISIBILITY', visibility: 0 }),
                put({ type: 'SET_MUI_FLASH_MESSAGES_MESSAGE', muiFlashMessageMessage: errorMessage}),
                put({ type: 'SET_MUI_FLASH_MESSAGES_VISIBILITY', muiFlashMessageVisibility: 1}),
                put({ type: 'SET_MUI_FLASH_MESSAGES_TYPE', muiFlashMessageType: 'error'}),
            ])
            yield delay(3000);
            yield put({ type: 'SET_MUI_FLASH_MESSAGES_VISIBILITY', muiFlashMessageVisibility: 0});
        } else {
            yield all([
                put({ type: 'SET_OVERLAY_VISIBILITY', visibility: 0 }),
                put({ type: 'SET_MUI_FLASH_MESSAGES_MESSAGE', muiFlashMessageMessage: translations.commenttError}),
                put({ type: 'SET_MUI_FLASH_MESSAGES_VISIBILITY', muiFlashMessageVisibility: 1}),
                put({ type: 'SET_MUI_FLASH_MESSAGES_TYPE', muiFlashMessageType: 'error'}),
            ])
            yield delay(3000);
            yield put({ type: 'SET_MUI_FLASH_MESSAGES_VISIBILITY', muiFlashMessageVisibility: 0});
        }
        yield  put (reset('addCommentFormRedux'));
     
    } catch(e) {
        yield  put (reset('addCommentFormRedux'));
        yield put({ type: 'SET_OVERLAY_VISIBILITY', visibility: 0 });
        yield all([
            put({ type: 'SET_MUI_FLASH_MESSAGES_MESSAGE', muiFlashMessageMessage: translations.commenttError}),
            put({ type: 'SET_MUI_FLASH_MESSAGES_VISIBILITY', muiFlashMessageVisibility: 1}),
            put({ type: 'SET_MUI_FLASH_MESSAGES_TYPE', muiFlashMessageType: 'error'}),
        ])
        yield delay(3000);
        yield put({ type: 'SET_MUI_FLASH_MESSAGES_VISIBILITY', muiFlashMessageVisibility: 0});
    }
}


