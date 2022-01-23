import {reset} from 'redux-form';
import store from '../index.js';
import { put, takeLatest, all, takeEvery, call, delay } from 'redux-saga/effects';
import messages from '../translations/Comments';
import { createComment } from '../api/comment';
import { sendContributionSaga } from '../api/contribution';
//

function* postComment(comment) {
    const translations = {
        commentSuccess:  store.getState().settingsReducer.language === 'en' ? messages.en.commenttSuccess : messages.ru.commenttSuccess,
        commenttError:  store.getState().settingsReducer.language === 'en' ? messages.en.commenttError : messages.ru.commenttError,
    }
    
    try {
        yield put({ type: 'SET_OVERLAY_VISIBILITY', visibility: 1 });
        const responceData = yield call(createComment, comment.comment);
        if (responceData.data.payload.success == 'true'){
            yield all([
                put({ type: 'SET_OVERLAY_VISIBILITY', visibility: 0 }),
                put({ type: 'SET_FLASH_MESSAGES_MESSAGE_1', flashMessageMessage: translations.commentSuccess}),
                put({ type: 'SET_FLASH_MESSAGES_VISIBILITY', flashMessageVisibility: 1}),
            ])
            yield delay(2000);
            yield put({ type: 'SET_FLASH_MESSAGES_VISIBILITY', flashMessageVisibility: 0 });
        } else {
            yield all([
                put({ type: 'SET_OVERLAY_VISIBILITY', visibility: 0 }),
                put({ type: 'SET_FLASH_MESSAGES_MESSAGE_1', flashMessageMessage: translations.commenttError}),
                put({ type: 'SET_FLASH_MESSAGES_VISIBILITY', flashMessageVisibility: 1}),
            ])
            yield delay(2000);
            yield put({ type: 'SET_FLASH_MESSAGES_VISIBILITY', flashMessageVisibility: 0 });
        }
        yield  put (reset('addCommentFormRedux'));
     
    } catch(e) {
        yield  put (reset('addCommentFormRedux'));
        yield all([
            put({ type: 'SET_FLASH_MESSAGES_MESSAGE_1', flashMessageMessage: translations.commenttError}),
            put({ type: 'SET_FLASH_MESSAGES_VISIBILITY', flashMessageVisibility: 1}),
        ])
        yield delay(2000);
        yield put({ type: 'SET_FLASH_MESSAGES_VISIBILITY', flashMessageVisibility: 0 });
    }
}

function* postContribution({question, firstAnswer, secondAnswer, thirdAnswer, fourthAnswer, subjectId}){
    const translations = {
        commentSuccess:  store.getState().settingsReducer.language === 'en' ? messages.en.commenttSuccess : messages.ru.commenttSuccess,
        commenttError:  store.getState().settingsReducer.language === 'en' ? messages.en.commenttError : messages.ru.commenttError,
    }
    
    try {
        yield put({ type: 'SET_OVERLAY_VISIBILITY', visibility: 1 });
        const responceData = yield call(sendContributionSaga, {question, firstAnswer, secondAnswer, thirdAnswer, fourthAnswer, subjectId});
        if (responceData.data.payload.success == 'true'){
            yield all([
                put({ type: 'SET_OVERLAY_VISIBILITY', visibility: 0 }),
                put({ type: 'SET_FLASH_MESSAGES_MESSAGE_1', flashMessageMessage: translations.commentSuccess}),
                put({ type: 'SET_FLASH_MESSAGES_VISIBILITY', flashMessageVisibility: 1}),
            ])
            yield delay(2000);
            yield put({ type: 'SET_FLASH_MESSAGES_VISIBILITY', flashMessageVisibility: 0 });
        } else {
            yield all([
                put({ type: 'SET_OVERLAY_VISIBILITY', visibility: 0 }),
                put({ type: 'SET_FLASH_MESSAGES_MESSAGE_1', flashMessageMessage: translations.commenttError}),
                put({ type: 'SET_FLASH_MESSAGES_VISIBILITY', flashMessageVisibility: 1}),
            ])
            yield delay(2000);
            yield put({ type: 'SET_FLASH_MESSAGES_VISIBILITY', flashMessageVisibility: 0 });
        }
        yield  put (reset('addCommentFormRedux'));
     
    } catch(e) {
        yield  put (reset('addCommentFormRedux'));
        yield all([
            put({ type: 'SET_FLASH_MESSAGES_MESSAGE_1', flashMessageMessage: translations.commenttError}),
            put({ type: 'SET_FLASH_MESSAGES_VISIBILITY', flashMessageVisibility: 1}),
        ])
        yield delay(2000);
        yield put({ type: 'SET_FLASH_MESSAGES_VISIBILITY', flashMessageVisibility: 0 });
    }
    ///console.log("contr saga and question = ", payload);
}



function* commentsActionWatcher() {
    yield takeLatest('POST_COMMENT', postComment)
}

function* contributionActionWatcher() {
    yield takeLatest('POST_CONTRIBUTION_SAGA', postContribution)
}

export default function* rootSaga() {
    yield all([
        commentsActionWatcher(),
        contributionActionWatcher(),
    ]);
}