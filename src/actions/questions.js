import axios from 'axios';
import helpers from '../helpers/Helpers';
import { LOAD_SUBJECTS_ADMIN, CLEAR_SENSITIVE_INFO, SET_RESULTS_FILTER_ACTIVE_SUBJECTS, 
    SET_FLASH_MESSAGES_VISIBILITY, SET_FLASH_MESSAGES_MESSAGE, SET_FLASH_MESSAGES_TYPE, SET_CURRENT_SUBJECT_ID_TO_ADD_QUESTION, SET_RESULTS_FILTERED, SET_RESULTS_FILTER_ITEMS_PAGE,
    SET_CURRENT_QUESTIONS_BY_SUBJECT_TO_EDIT, SET_NUMBER_OF_CURRENT_QUESTIONS_BY_SUBJECT_TO_EDIT, SET_CURRENT_PAGINATION_QUESTIONS_BY_SUBJECT, SET_PAGINATED_QUESTIONS } from '../types';
import store from '../index.js';
import {reset} from 'redux-form';
import messages from '../translations/Questions';

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
    const currentSubjId = store.getState().questionsReducer.currentSubjectId;
    const headers = { 'JWToken': JWT };
    return (dispatch) => {
        return axios.get(BaseUrl + 'react/questions/' + currentSubjId, {
            headers: headers
        })
        .then(responce => {
            if(responce.data.payload.success === "true"){
               // let resultsFilterBySubjectsAndSort = helpers.FilterBySubjectsAndSort(responce.data.payload.results, store.getState().resultsReducer.resultsFilterActiveSubjects, store.getState().resultsReducer.resultsFilterSortingOption);
               // dispatch(setNumberOfPaginationAction(Math.ceil(resultsFilterBySubjectsAndSort.length/itemsPerPage)));
               // dispatch(setResultsFiltered(helpers.PaginatedResults(resultsFilterBySubjectsAndSort, itemsPerPage, store.getState().resultsReducer.resultsFilterPaginationNumber)))
               // dispatch(changeResults(responce.data.payload.results))
               dispatch(setNumberOfQuestionsToEdit(responce.data.payload.questions.length));
               dispatch(setQuestionsToEdit(responce.data.payload.questions));
            } else {
                dispatch(clearSensitiveinfo([]))
            };
        })
        .catch(error => {
            throw(error);
        });
    }
}

export function setResultsPaginated(results){
    return (dispatch) => {
        dispatch(setResultsPaginatedDispatch(results));
    }
}

export function setCurrentPagination(i){
    return (dispatch) => {
        dispatch(setCurrentPaginationDispatch(i));
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
            console.dir(response);
            if(response.data.payload.success === "true"){
                dispatch(reset('editContibutionFormAdminRedux'));
                dispatch(changeFlashMessageVisibility(1));
                dispatch(changeFlashMessageMessage(messages[currentLang].questHasBeenAddedSucc));////'Question/answers has been added successfully, thanks'
                dispatch(changeFlashMessageType('success'));
                setTimeout(function(){ dispatch(changeFlashMessageVisibility(0)); }, timeout);
            } else {
                alert("Network error, please try again later");
            };
        })
        .catch(error => {
            throw(error);
        });
    };
}

function showFlashMessage(dispatch, message, type){
    const timeout = store.getState().settingsReducer.flashMessagesTimeout;
    dispatch(changeFlashMessageVisibility(1));
    dispatch(changeFlashMessageMessage(message));
    dispatch(changeFlashMessageType(type));
    setTimeout(function(){ dispatch(changeFlashMessageVisibility(0)); }, timeout);
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

function changeFlashMessageMessage(message){
    return{
        type: SET_FLASH_MESSAGES_MESSAGE,
        flashMessageMessage: message    
    }
}

function changeFlashMessageType(type){
    return{
        type: SET_FLASH_MESSAGES_TYPE,
        flashMessageType: type    
    }
}

function ResultsFilterActiveSubjects(subjects){
    return{
        type: SET_RESULTS_FILTER_ACTIVE_SUBJECTS,
        resultsFilterActiveSubjects: subjects    
    }
}