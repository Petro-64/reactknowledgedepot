import { put, takeLatest, all, takeEvery, call, delay } from 'redux-saga/effects';
import { postComment } from './comment';
import { postContribution } from './contribution';
import { postEditQuestions } from './questions';
import { getRateLimiter } from './ratelimiter';

function* commentsActionWatcher() {
    yield takeLatest('POST_COMMENT', postComment)
}

function* contributionActionWatcher() {
    yield takeLatest('POST_CONTRIBUTION_SAGA', postContribution)
}

function* editQuestionsActionWatcher() {
    yield takeLatest('POST_EDITED_QUESTIONS', postEditQuestions)
}

function* getRateLimiterWatcher() {
    yield takeLatest('GET_RATE_LIMITER_SETTINGS', getRateLimiter)
}

export default function* rootSaga() {
    yield all([
        commentsActionWatcher(),
        contributionActionWatcher(),
        editQuestionsActionWatcher(),
        getRateLimiterWatcher()
    ]);
}