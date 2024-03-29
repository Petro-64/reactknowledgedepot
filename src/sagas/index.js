import { takeLatest, all } from 'redux-saga/effects';
import { postComment } from './comment';
import { postContribution } from './contribution';
import { postEditQuestions } from './questions';
import { getRateLimiter } from './ratelimiter';
import { addQuestReport } from './addquestionreport';
import { searchQuestionsByKey } from './search';
import { postEditSearchQuestions } from './searchQuestions';
import { getMistakesSaga } from './mistakes';
import { searchQuestionsByTypeAhead } from './searchQuestionsByTypeAhead';
import { deleteMistakeSaga } from './deleteMistake';
import { postdeleteMistakeSaga } from './postdeleteMistake';

function* commentsActionWatcher() {
    yield takeLatest('POST_COMMENT', postComment)
}

function* contributionActionWatcher() {
    yield takeLatest('POST_CONTRIBUTION_SAGA', postContribution)
}

function* editQuestionsActionWatcher() {
    yield takeLatest('POST_EDITED_QUESTIONS', postEditQuestions)
}

function* addQuestionReportWatcher() {
    yield takeLatest('POST_REPORT', addQuestReport)
}

function* getRateLimiterWatcher() {
    yield takeLatest('GET_RATE_LIMITER_SETTINGS', getRateLimiter)
}

function* searchQuestionsByKeyWordWatcher() {
    yield takeLatest('SEARCH_QUESTION_BY_KEYWORD', searchQuestionsByKey)
}

function* searchQuestionsByTypeAheadWatcher() {
    yield takeLatest('SEARCH_QUESTION_BY_TYPEAHEAD', searchQuestionsByTypeAhead)
}

function* editFoundByKeyWordQuestionsActionWatcher() {
    yield takeLatest('POST_EDITED_SEARCH_QUESTIONS', postEditSearchQuestions)
}

function* getMistakesActionWatcher() {
    yield takeLatest('GET_MISTAKES', getMistakesSaga)
}

function* deleteMistakeActionWatcher() {
    yield takeLatest('DELETE_MISTAKE', postdeleteMistakeSaga)
    //yield takeLatest('DELETE_MISTAKE', deleteMistakeSaga)
}


export default function* rootSaga() {
    yield all([
        commentsActionWatcher(),
        contributionActionWatcher(),
        editQuestionsActionWatcher(),
        getRateLimiterWatcher(),
        addQuestionReportWatcher(),
        searchQuestionsByKeyWordWatcher(),
        editFoundByKeyWordQuestionsActionWatcher(),
        getMistakesActionWatcher(),
        searchQuestionsByTypeAheadWatcher(),
        deleteMistakeActionWatcher()
    ]);
}