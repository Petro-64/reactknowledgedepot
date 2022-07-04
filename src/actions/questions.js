import axios from 'axios';
import helpers from '../helpers/Helpers';
import { LOAD_SUBJECTS_ADMIN, CLEAR_SENSITIVE_INFO,  
    SET_FLASH_MESSAGES_VISIBILITY, SET_CURRENT_SUBJECT_ID_TO_ADD_QUESTION, SET_RESULTS_FILTERED, SET_RESULTS_FILTER_ITEMS_PAGE,
    SET_CURRENT_QUESTIONS_BY_SUBJECT_TO_EDIT, 
    SET_NUMBER_OF_CURRENT_QUESTIONS_BY_SUBJECT_TO_EDIT, 
    SET_CURRENT_PAGINATION_QUESTIONS_BY_SUBJECT, 
    SET_PAGINATED_QUESTIONS, 
    SET_QUESTIONS_TO_EDIT_STATUS,
    SET_ANSWERS_FOR_QUESTION_ID,
    SET_ADMIN_EDIT_QUESTION_ITEM,
    SET_CURRENT_SUBJECT_NAME_FOR_QUESTION_EDIT, SET_REDIRECT_FLAG_TO_BACK_TO_QUESTIONS_LIST, PUSH_EDITED_QUESTION_ID_TO_ARRAY_TO_BE_ABLE_TO_SEE_RECENTLY_EDITED_QUESTIONS,
    CLEAR_EDITED_QUESTIONS_LIST } from '../types';
import store from '../index.js';
import {reset} from 'redux-form';
import messages from '../translations/Questions';
import showMuiFlashMessage from './snackBarControl';


const BaseUrl = helpers.UrlSniffer();


export function loadSubjectsAdmin(){
    const JWT = store.getState().loginSignUpReducer.JWToken;
    const headers = { 'JWToken': JWT };
    return (dispatch) => {
        return axios.get(BaseUrl + 'react/subjectsadmin', {
            headers: headers
        })
        .then(responce => {
            if(responce.data.payload.success === "true"){
                dispatch(changeSubjectsAdmin(responce.data.payload.subjects))
            } else {
                dispatch(clearSensitiveinfo())
            };
        })
        .catch(error => {
            throw(error);
        });
    }
}

export function loadQuestions(){
    const JWT = store.getState().loginSignUpReducer.JWToken;
    const itemsPerPage = store.getState().questionsReducer.resultsFilterPerPage;
    const currentPagination = store.getState().questionsReducer.currentPagination;
    let currentSubjId = store.getState().questionsReducer.currentSubjectId;
    const currentStatus = store.getState().questionsReducer.currentStatus;// all, active, unactive
    const headers = { 'JWToken': JWT };
    return (dispatch) => {
        return axios.get(BaseUrl + 'react/questions/' + currentSubjId + '/' + currentStatus, {
            headers: headers
        })
        .then(responce => {
            if(responce.data.payload.success === "true"){
               dispatch(setNumberOfQuestionsToEdit(responce.data.payload.questions.length));
               dispatch(setQuestionsToEdit(responce.data.payload.questions));
               let paginatedQuestions = helpers.SimplePaginatedResults(responce.data.payload.questions, itemsPerPage, currentPagination);
               dispatch(setResultsPaginated(paginatedQuestions));
            } else {
                dispatch(clearSensitiveinfo([]))
            };
        })
        .catch(error => {
            throw(error);
        });
    }
}

export function toggleQuestionActivity(id){
    const JWT = store.getState().loginSignUpReducer.JWToken;
    const itemsPerPage = store.getState().questionsReducer.resultsFilterPerPage;
    const currentPagination = store.getState().questionsReducer.currentPagination;
    let currentSubjId = store.getState().questionsReducer.currentSubjectId;
    const currentStatus = store.getState().questionsReducer.currentStatus;
    const headers = { 'JWToken': JWT };
    return (dispatch) => {
        return axios.get(BaseUrl + 'react/togglequestionactivity/' + id, {
            headers: headers
        })
        .then(responce => {
            if(responce.data.payload.success === "true"){
                return axios.get(BaseUrl + 'react/questions/' + currentSubjId + '/' + currentStatus, {
                    headers: headers
                })
                .then(responce => {
                    if(responce.data.payload.success === "true"){
                       dispatch(setNumberOfQuestionsToEdit(responce.data.payload.questions.length));
                       dispatch(setQuestionsToEdit(responce.data.payload.questions));
                       let paginatedQuestions = helpers.SimplePaginatedResults(responce.data.payload.questions, itemsPerPage, currentPagination);
                       dispatch(setResultsPaginated(paginatedQuestions));
                    } else {
                        dispatch(clearSensitiveinfo([]))
                    };
                })
                .catch(error => {
                    dispatch(clearSensitiveinfo([]))
                });
             } else {
                 dispatch(clearSensitiveinfo([]))
             };
        })
        .catch(error => {
            throw(error);
        });
    }
}

export function loadAnswers(id){
    const JWT = store.getState().loginSignUpReducer.JWToken;
    const headers = { 'JWToken': JWT };
    return (dispatch) => {
        return axios.get(BaseUrl + 'react/answers/' + id, {
            headers: headers
        })
        .then(responce => {
            if(responce.data.payload.success === "true"){
                dispatch(setAnswers(responce.data.payload.answers));
            } else {
                dispatch(clearSensitiveinfo([]))
            };
        })
        .catch(error => {
            throw(error);
        });
    }
}

export function loadQuestionsAndAnswersToEditAdmin(id){
    const JWT = store.getState().loginSignUpReducer.JWToken;
    const headers = { 'JWToken': JWT };

    return (dispatch) => {
        return axios.get(BaseUrl + 'react/getquestionandanswerstoedit/' + id, {
            headers: headers
        })
        .then(responce => {
            if(responce.data.payload.success === "true"){
                dispatch(setQuestionsAndAnswersToEdit(responce.data.payload.content))
            } else {
                dispatch(clearSensitiveinfo())
            };
        })
        .catch(error => {
            throw(error);
        });
    }
}

export function editQuestionsSaga({editedValues}){
    return (dispatch) => {
        dispatch(editQuestionsSagaDispatch({editedValues}));
    }
}

export function editQuestionsSagaDispatch({editedValues}){
    return{
        type: 'POST_EDITED_QUESTIONS',
        editedValues: editedValues
    }
}

export function deleteQuestion(ifNeedToRedirect){
    const JWT = store.getState().loginSignUpReducer.JWToken;
    const headers = { 'JWToken': JWT };
    const questionId = store.getState().questionsReducer.adminEditQuestionItem.questionId;
    const itemsPerPage = store.getState().questionsReducer.resultsFilterPerPage;
    const currentPagination = store.getState().questionsReducer.currentPagination;
    let currentSubjId = store.getState().questionsReducer.currentSubjectId;
    const currentStatus = store.getState().questionsReducer.currentStatus;

    return (dispatch) => {
        return axios.delete(BaseUrl + 'react/deletequestion/' + questionId, {
            headers: headers
        })
        .then(responce => {
            if(responce.data.payload.success === "true"){
                return axios.get(BaseUrl + 'react/questions/' + currentSubjId + '/' + currentStatus, {
                    headers: headers
                })
                .then(responce => {
                    if(responce.data.payload.success === "true"){
                        dispatch(setNumberOfQuestionsToEdit(responce.data.payload.questions.length));
                        dispatch(pushQuestionIdToIdsArray(parseInt(questionId)));/// to be able to distinguish visually already edited questions (ex. table row bg color?)
                        dispatch(setQuestionsToEdit(responce.data.payload.questions));
                        let paginatedQuestions = helpers.SimplePaginatedResults(responce.data.payload.questions, itemsPerPage, currentPagination);
                        dispatch(setResultsPaginated(paginatedQuestions));
                        if(ifNeedToRedirect){
                            dispatch(setRedirectFlagToBackToQuestionsList(2));
                        }
                        showMuiFlashMessage(dispatch, "Question has been deleted successfully", 'success');
                    } else {
                        showMuiFlashMessage(dispatch, "Question deletedion failure", 'error');
                        dispatch(clearSensitiveinfo([]))
                    };
                })
                .catch(error => {
                    showMuiFlashMessage(dispatch, "Question deletedion failure", 'error');
                    dispatch(clearSensitiveinfo([]))
                });
            } else {
                showMuiFlashMessage(dispatch, "Question deletedion failure", 'error');
                dispatch(clearSensitiveinfo([]))
            };
        })
        .catch(error => {
            throw(error);
        });
    }
}

export function setCurrentPagination(i){
    return (dispatch) => {
        dispatch(setCurrentPaginationDispatch(i));
    }
}

export function pushQuestionIdToIdsArray(id){
    return (dispatch) => {
        dispatch(pushQuestionIdToIdsArrayDispatch(id));
    }
}

export function setRedirectFlagToBackToQuestionsList(n){
    return (dispatch) => {
        dispatch(setRedirectFlagToBackToQuestionsListDispatch(n));
    }
}

export function setSubjName(name){
    return (dispatch) => {
        dispatch(setCurrentSubjectNameDispatch(name));
    }
}

export function clearEditedQuestionsList(){
    return (dispatch) => {
        dispatch(clearEditedQuestionsListDispatch());
    }
}

export function clearEditedQuestionsListDispatch(id){
    return{
        type: CLEAR_EDITED_QUESTIONS_LIST,
        id: id    
    }
}

export function pushQuestionIdToIdsArrayDispatch(id){
    return{
        type: PUSH_EDITED_QUESTION_ID_TO_ARRAY_TO_BE_ABLE_TO_SEE_RECENTLY_EDITED_QUESTIONS,
        id: id    
    }
}

export function setRedirectFlagToBackToQuestionsListDispatch(n){
    return{
        type: SET_REDIRECT_FLAG_TO_BACK_TO_QUESTIONS_LIST,
        n: n    
    }
}

export function setCurrentSubjectNameDispatch(name){
    return{
        type: SET_CURRENT_SUBJECT_NAME_FOR_QUESTION_EDIT,
        name: name    
    }
}

function setQuestionsAndAnswersToEdit(content){
    return{
        type: SET_ADMIN_EDIT_QUESTION_ITEM,
        content: content    
    }
}

export function setAnswers(answers){
    return (dispatch) => {
        dispatch(setAnswersToDispatch(answers));
    }
}

export const setAnswersToDispatch = (answers) => {
    return{
        type: SET_ANSWERS_FOR_QUESTION_ID,
        answers: answers
    }
}

export function clearQuestions(){
    return (dispatch) => {
        dispatch(setQuestionsToEdit([]));
        dispatch(setResultsPaginated([]));
    }
}

export function setResultsPaginated(results){
    return (dispatch) => {
        dispatch(setResultsPaginatedDispatch(results));
    }
}

export function setStatus(status){
    return (dispatch) => {
        dispatch(setStatusDispatch(status));
    }
}

export const setStatusDispatch = (status) => {
    return{
        type: SET_QUESTIONS_TO_EDIT_STATUS,
        status: status
    }
}

export const setResultsPaginatedDispatch = (results) => {
    return{
        type: SET_PAGINATED_QUESTIONS,
        results: results
    }
}

export const setCurrentPaginationDispatch = (number) => {
    return{
        type: SET_CURRENT_PAGINATION_QUESTIONS_BY_SUBJECT,
        number: number
    }
}

export const setNumberOfQuestionsToEdit = (number) => {
    return{
        type: SET_NUMBER_OF_CURRENT_QUESTIONS_BY_SUBJECT_TO_EDIT,
        number: number
    }
}

export const setQuestionsToEdit = (questions) => {
    return{
        type: SET_CURRENT_QUESTIONS_BY_SUBJECT_TO_EDIT,
        questions: questions
    }
}

export const setCurrentSubjectIdToAddQuestion = (id) => {
    return (dispatch) => {
        dispatch(setCurrSubjectIdReduxToAddQuestion(id))
    };
}

export const setCurrSubjectIdReduxToAddQuestion = (id) => {
    return{
        type: SET_CURRENT_SUBJECT_ID_TO_ADD_QUESTION,
        id: id
    }
}

export const addNewQuestionAdmin = () => {
    const question = store.getState().form.editContibutionFormAdminRedux.values.question;
    const firstAnswer = store.getState().form.editContibutionFormAdminRedux.values.uncorrect0;
    const secondAnswer = store.getState().form.editContibutionFormAdminRedux.values.uncorrect1;
    const thirdAnswer = store.getState().form.editContibutionFormAdminRedux.values.uncorrect2;
    const fourthAnswer = store.getState().form.editContibutionFormAdminRedux.values.answerCorrect;
    const subjectId = store.getState().questionsReducer.currentSubjectId;

    const JWT = store.getState().loginSignUpReducer.JWToken;
    const headers = { 'JWToken': JWT };
    const timeout = store.getState().settingsReducer.flashMessagesTimeout;
    const currentLang = store.getState().settingsReducer.language;
    return (dispatch) => {
        return axios.post(BaseUrl + 'react/addquestion', { question, firstAnswer, secondAnswer, thirdAnswer, fourthAnswer, subjectId }, {
            headers: headers
        })
        .then(response => {
            if(response.data.payload.success === "true"){
                dispatch(reset('editContibutionFormAdminRedux'));
                showMuiFlashMessage(dispatch, messages[currentLang].questHasBeenAddedSucc, 'success');
                setTimeout(function(){ dispatch(changeFlashMessageVisibility(0)); }, timeout);
            } else {
                showMuiFlashMessage(dispatch, "Network error", 'error');
            };
        })
        .catch(error => {
            showMuiFlashMessage(dispatch, "Network error", 'error');
        });
    };
}

export function setResultsFiltered(results){
    return(dispatch) => {
        dispatch(ResultsFiltered(results))
    }
}

function ResultsFiltered(ResultsFiltered){
    return{
        type: SET_RESULTS_FILTERED,
        resultsFiltered: ResultsFiltered    
    }
}

export function setItemsPerPage(items){
    return(dispatch) => {
        dispatch(setItemPerPage(items))
    }
}

function setItemPerPage(items){
    return {
        type: SET_RESULTS_FILTER_ITEMS_PAGE,
        items: items 
    }
}

function changeSubjectsAdmin(subjects){
    return{
        type: LOAD_SUBJECTS_ADMIN,
        subjects: subjects    
    }
}

function clearSensitiveinfo(){
    return{
        type: CLEAR_SENSITIVE_INFO,
    }
}

function changeFlashMessageVisibility(value){
    return{
        type: SET_FLASH_MESSAGES_VISIBILITY,
        flashMessageVisibility: value    
    } 
}
