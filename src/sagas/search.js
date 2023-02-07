import store from '../index.js';
import { put, call } from 'redux-saga/effects';
import messages from '../translations/SearchForQuestions';
import { searchQuestionsByKeyApi } from '../api/search';
import { showHideSpinnerAndMessage } from './sagaUtilities';


export function* searchQuestionsByKey({questionsearchkeyword}) {// route is the page url to store to be able to identify page
    const translations = {
        commentSuccess:   messages[store.getState().settingsReducer.language].searchSuccess,
        commenttError:  messages[store.getState().settingsReducer.language].searchError,
    }

    try {
        yield put({ type: 'SET_OVERLAY_VISIBILITY', visibility: 1 });
        const responceData = yield call(searchQuestionsByKeyApi, {questionsearchkeyword});
        if (responceData.data.payload.success === 'true'){
            yield showHideSpinnerAndMessage(1, translations.commentSuccess, 1, 'success'); 
            yield put({ type: 'SET_SEARCH_QUESTIONS_BY_KEY_RESULT', questions: responceData.data.payload.questions });
            yield put({ type: 'SET_OVERLAY_VISIBILITY', visibility: 0 });
        } else {
            yield showHideSpinnerAndMessage(0, translations.commenttError, 1, 'error');
            yield put({ type: 'SET_OVERLAY_VISIBILITY', visibility: 0 });
        }
    } catch(e) {
        yield showHideSpinnerAndMessage(0, translations.commenttError, 1, 'error');
        yield put({ type: 'SET_OVERLAY_VISIBILITY', visibility: 0 });
    }
}