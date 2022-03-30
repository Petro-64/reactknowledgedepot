import store from '../index.js';
import { put, all, call, delay } from 'redux-saga/effects';
import { editQuestionPost, getQuestionsBySubjectAndStatus } from '../api/questions';
import helpers from '../helpers/Helpers';


export function* postEditQuestions({editedValues}) {
    let currentSubjId = store.getState().questionsReducer.currentSubjectId;
    const currentStatus = store.getState().questionsReducer.currentStatus;
    const itemsPerPage = store.getState().questionsReducer.resultsFilterPerPage;
    const currentPagination = store.getState().questionsReducer.currentPagination;
    try {
        yield put({ type: 'SET_OVERLAY_VISIBILITY', visibility: 1 });
        const responceData = yield call(editQuestionPost, {editedValues});
        if (responceData.data.payload.success === 'true'){
            const getResponceData = yield call(getQuestionsBySubjectAndStatus, {currentSubjId, currentStatus});
            if (getResponceData.data.payload.success === 'true'){
                yield put({ type: 'SET_NUMBER_OF_CURRENT_QUESTIONS_BY_SUBJECT_TO_EDIT',  number: getResponceData.data.payload.questions.length });
                yield put({ type: 'PUSH_EDITED_QUESTION_ID_TO_ARRAY_TO_BE_ABLE_TO_SEE_RECENTLY_EDITED_QUESTIONS', id: parseInt(editedValues.questionId) });
                yield put({ type: 'SET_CURRENT_QUESTIONS_BY_SUBJECT_TO_EDIT',  questions: getResponceData.data.payload.questions });
                let paginatedQuestions = helpers.SimplePaginatedResults(getResponceData.data.payload.questions, itemsPerPage, currentPagination);
                yield put({ type: 'SET_PAGINATED_QUESTIONS', results: paginatedQuestions });
                if(editedValues.ifNeedToRedirect){ yield put({ type: 'SET_REDIRECT_FLAG_TO_BACK_TO_QUESTIONS_LIST', n: 2 }); }
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