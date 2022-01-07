import axios from 'axios';
import helpers from '../helpers/Helpers';
import { SET_CURRENT_SUBJECT_ID, SET_TESTING_SESSION_HASH, SET_CURRENT_SUBJECT_NAME, 
    SET_CURRENT_QUESTION, SET_ANSWERS, SET_NUMBER_OF_ANSWERED, SET_NUMBER_OF_CORRECT, SET_IF_REMAIN_QUESTIONS, SET_CORRECT_ANSWER_ID, SET_IF_TO_SHOW_TEST_HINTS_BORDER,
    SET_IF_TO_SHOW_TEST_HINTS, SET_OVERLAY_VISIBILITY } from '../types';
import store from '../index.js';

const BaseUrl = helpers.UrlSniffer();

export const processTesting = (testingSessionHash, answerId) => {
    const JWT = store.getState().loginSignUpReducer.JWToken;
    const headers = { 'JWToken': JWT };
     return (dispatch) => {
        return axios.post(BaseUrl + 'react/processTesting/', {testingSessionHash, answerId}, {
            headers: headers
        })
        .then(response => {
            if(response.data.payload.success === "true"){
                if (store.getState().testReducer.toShowTestingHints === 1){
                    dispatch(setCurrentQuestion(response.data.payload.question));
                    dispatch(setAnswers(response.data.payload.answersToShow));
                    dispatch(setNumberOfAnswered(response.data.payload.answered));
                    dispatch(setNumberOfCorrect(response.data.payload.correct));
                    dispatch(setIfRemainQuestions(response.data.payload.ifRemainQuestions));
                    dispatch(setCorrectAnswerId(response.data.payload.correctAnswerId));
                    //dispatch(setHintsBorderVisibility(0))
                    ///store.getState().testReducer.testHintsBorderTimeout
                } else {
                    dispatch(setCurrentQuestion(response.data.payload.question));
                    dispatch(setAnswers(response.data.payload.answersToShow));
                    dispatch(setNumberOfAnswered(response.data.payload.answered));
                    dispatch(setNumberOfCorrect(response.data.payload.correct));
                    dispatch(setIfRemainQuestions(response.data.payload.ifRemainQuestions));
                    dispatch(setCorrectAnswerId(response.data.payload.correctAnswerId));
                    ///dispatch(setHintsBorderVisibility(0))
                }
                dispatch(setHintsBorderVisibility(0))
                dispatch(setOverlayVisibilityDispatch(false))
            } else {
                throw(response.data.payload.message);
            };
        })
        .catch(error => {
            throw(error);
        });
    };
}

export function startNewTest(currentSubjectId, testingSessionId){
    const JWT = store.getState().loginSignUpReducer.JWToken;
    const headers = { 'JWToken': JWT };
    return (dispatch) => {
        return axios.post(BaseUrl + 'react/startTesting', {currentSubjectId, testingSessionId}, {
            headers: headers
        })
        .then(response => {
            if(response.data.payload.success === "true"){
                dispatch(saveTestingSessionHash(response.data.payload.testingSessionHash));
                this.processTesting(response.data.payload.testingSessionHash);
            } else {
                throw(response.data.payload.message);
            };
        })
        .catch(error => {
            throw(error);
        });
    };
}

export function setIfToShowTestingHints(value){
    return (dispatch) => {
        dispatch(setIfToShowTestingHintsDispatch(value))
    };
}

export const destroyTemporaryTestingQuestions = (testingSessionHash, ifToDestroyTemporaryQuestions) => {
    return (dispatch) => {
        return axios.post(BaseUrl + 'react/processTesting/', {testingSessionHash, ifToDestroyTemporaryQuestions})
        .then(response => {
            if(response.data.payload.success === "true"){} else { throw(response.data.payload.message); };
        })
        .catch(error => {
            throw(error);
        });
    };
}

export const setCurrentSubjectId = (id) => {
    return (dispatch) => {
        dispatch(setCurrSubjectIdRedux(id))
    };
}

export const setOverlayVisibility = (bool) => {
    return (dispatch) => {
        dispatch(setOverlayVisibilityDispatch(bool))
    };
}

export function setOverlayVisibilityDispatch(bool){
    return{
        type: SET_OVERLAY_VISIBILITY,
        visibility: bool
    }
}


export function setCurrSubjectIdRedux(id){
    return{
        type: SET_CURRENT_SUBJECT_ID,
        id: id
    }
}

export const setCurrentSubjectName = (name) => {
    return (dispatch) => {
        dispatch(setCurrSubjectNameRedux(name))
    };
}

export const setTestingSessionHash = (data) => {
    return (dispatch) => {
        dispatch(saveTestingSessionHash(data))
    };
}

export function setCurrSubjectNameRedux(name){
    return{
        type: SET_CURRENT_SUBJECT_NAME,
        name: name
    }
}

export function setCurrentQuestion(currentQuestion){
    return {
        type: SET_CURRENT_QUESTION,
        currentQuestion: currentQuestion,
    }
}

export function saveTestingSessionHash(data){
    return{
        type: SET_TESTING_SESSION_HASH,
        testingSessionHash: data
    }
}

export function setAnswers(answers){
    return {
        type: SET_ANSWERS,
        answers: answers,
    }
}

export function setIfToShowTestingHintsDispatch(value){
    return {
        type: SET_IF_TO_SHOW_TEST_HINTS,
        ifToShowTestingHints: value,
    }
}

export function setNumberOfAnswered(number){
    return {
        type: SET_NUMBER_OF_ANSWERED,
        number: number,
    }
}

export function setHintsBorderVisibility(number){
    return {
        type: SET_IF_TO_SHOW_TEST_HINTS_BORDER,
        visibility: number,
    }
}

export function setNumberOfCorrect(number){
    return {
        type: SET_NUMBER_OF_CORRECT,
        number: number,
    }
}

export function setCorrectAnswerId(id){
    return {
        type: SET_CORRECT_ANSWER_ID,
        id: id,
    }
}

export function setIfRemainQuestions(number){
    return {
        type: SET_IF_REMAIN_QUESTIONS,
        number: number,
    }
}

