import axios from 'axios';
import helpers from '../helpers/Helpers';
import { SET_CURRENT_CONTRIBUTION_SUBJECT_ID, SET_CURRENT_CONTRIBUTION_SUBJECT_NAME, 
    SET_FLASH_MESSAGES_VISIBILITY, SET_FLASH_MESSAGES_MESSAGE, SET_FLASH_MESSAGES_TYPE, 
    SET_ADMIN_CONTRIBUTION, CLEAR_SENSITIVE_INFO, SET_CONTRIBUTION_CONTENT, SET_REDIRECT_FLAG_FORADMIN, SET_USER_CONTRIBUTION, SET_USER_CONTRIBUTION_ITEM }  from '../types';
import {reset} from 'redux-form';
import messages from '../translations/actions/contribution';
import store from '../index.js';


const BaseUrl = helpers.UrlSniffer();

export const setCurrentContributionSubjectId = (id) => {
    return (dispatch) => {
        dispatch(setCurrSubjectContributionIdRedux(id))
    };
}

export const setCurrentContributionSubjectname = (name) => {
    return (dispatch) => {
        dispatch(setCurrSubjectContributionNameRedux(name))
    };
}

export const sentMyContribution = () => {
    const question = store.getState().form.addContibutionFormRedux.values.question;
    const firstAnswer = store.getState().form.addContibutionFormRedux.values.firstAnswer;
    const secondAnswer = store.getState().form.addContibutionFormRedux.values.secondAnswer;
    const thirdAnswer = store.getState().form.addContibutionFormRedux.values.thirdAnswer;
    const fourthAnswer = store.getState().form.addContibutionFormRedux.values.fourthAnswer;
    const subjectId = store.getState().contributionsReducer.contributionSubjectId;
    
    const JWT = store.getState().loginSignUpReducer.JWToken;
    const headers = { 'JWToken': JWT };
    const timeout = store.getState().settingsReducer.flashMessagesTimeout;
    const translations = {
        questionAddSuccess:  store.getState().settingsReducer.language === 'en' ? messages.en.questionAddSuccess : messages.ru.questionAddSuccess,
    }
    return (dispatch) => {
        return axios.post(BaseUrl + 'react/addmycontribution', { question, firstAnswer, secondAnswer, thirdAnswer, fourthAnswer, subjectId }, {
            headers: headers
        })
        .then(response => {
            console.dir(response.data);
            if(response.data.payload.success === "true"){
                dispatch(reset('addContibutionFormRedux'));
                dispatch(changeFlashMessageVisibility(1));
                dispatch(changeFlashMessageMessage(translations.questionAddSuccess));
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

export function saveContributionAdmin() {
    const question = store.getState().form.editContibutionFormAdminRedux.values.question;
    const firstAnswer = store.getState().form.editContibutionFormAdminRedux.values.uncorrect0;
    const secondAnswer = store.getState().form.editContibutionFormAdminRedux.values.uncorrect1;
    const thirdAnswer = store.getState().form.editContibutionFormAdminRedux.values.uncorrect2;
    const fourthAnswer = store.getState().form.editContibutionFormAdminRedux.values.answerCorrect;
    const contibutionid = store.getState().form.editContibutionFormAdminRedux.values.contibutionid;
    const subjectId = store.getState().form.editContibutionFormAdminRedux.values.subjectId;
    const userId = store.getState().form.editContibutionFormAdminRedux.values.userId;

    const JWT = store.getState().loginSignUpReducer.JWToken;
    const headers = { 'JWToken': JWT };
    const timeout = store.getState().settingsReducer.flashMessagesTimeout;
    return (dispatch) => {
        return axios.post(BaseUrl + 'react/approvecontributionitemadmin', { question, firstAnswer, secondAnswer, thirdAnswer, fourthAnswer, contibutionid, subjectId, userId }, {
            headers: headers
        })
        .then(response => {
            if(response.data.payload.success === "true"){
                dispatch(reset('editContibutionFormAdminRedux'));
                dispatch(changeFlashMessageVisibility(1));
                dispatch(changeFlashMessageMessage('Question has been approved and saved successfully, thanks'));
                dispatch(changeFlashMessageType('success'));
                dispatch(setContributionItemAdminResults({}));
                dispatch(setRedirectFlagForAdminDispatch(2));
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

export function declineContributionAdmin() {
    const contibutionid = store.getState().form.editContibutionFormAdminRedux.values.contibutionid;
    const JWT = store.getState().loginSignUpReducer.JWToken;
    const headers = { 'JWToken': JWT };
    const timeout = store.getState().settingsReducer.flashMessagesTimeout;
    return (dispatch) => {
        return axios.post(BaseUrl + 'react/declinecontributionitemadmin', { contibutionid }, {
            headers: headers
        })
        .then(response => {
            if(response.data.payload.success === "true"){
                dispatch(reset('editContibutionFormAdminRedux'));
                dispatch(changeFlashMessageVisibility(1));
                dispatch(changeFlashMessageMessage('Question has been declined successfully, thanks'));
                dispatch(changeFlashMessageType('success'));
                dispatch(setContributionItemAdminResults({}));
                dispatch(setRedirectFlagForAdminDispatch(2));
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

export function clearAdminContributionItem(){
    return (dispatch) => {
        dispatch(setContributionItemAdminResults({}))
    };
}

export function loadContributionAdmin(){
    const JWT = store.getState().loginSignUpReducer.JWToken;
    const headers = { 'JWToken': JWT };
    return (dispatch) => {
        return axios.get(BaseUrl + 'react/getcontributionadmin', {
            headers: headers
        })
        .then(responce => {
            if(responce.data.payload.success === "true"){
                dispatch(setContributionAdminResults(responce.data.payload.contibution))
            } else {
                dispatch(clearSensitiveinfo())
            };
        })
        .catch(error => {
            throw(error);
        });
    }
}

export function loadContributionItemAdmin(id){
    const JWT = store.getState().loginSignUpReducer.JWToken;
    const headers = { 'JWToken': JWT };
    const timeout = store.getState().settingsReducer.flashMessagesTimeout;

    return (dispatch) => {
        return axios.get(BaseUrl + 'react/getcontributionitemadmin/' + id, {
            headers: headers
        })
        .then(responce => {
            if(responce.data.payload.success === "true"){
                dispatch(setContributionItemAdminResults(responce.data.payload.content))
            } else {
                dispatch(clearSensitiveinfo())
            };
        })
        .catch(error => {
            throw(error);
        });
    }
}

export function loadContributionItemUser(id){
    console.log("loadContributionItemUser and id = ", id);
    const JWT = store.getState().loginSignUpReducer.JWToken;
    const headers = { 'JWToken': JWT };
    const timeout = store.getState().settingsReducer.flashMessagesTimeout;

    return (dispatch) => {
        
        return axios.get(BaseUrl + 'react/getcontributionitemuser/' + id, {
            headers: headers
        })
       
        .then(responce => {
            if(responce.data.payload.success === "true"){
                dispatch(setContributionItemUserResults(responce.data.payload.content))
            } else {
                dispatch(clearSensitiveinfo())
            };
        })
        .catch(error => {
            throw(error);
        });
    }
}

export function loadContributionUser(){
    const JWT = store.getState().loginSignUpReducer.JWToken;
    const headers = { 'JWToken': JWT };
    return (dispatch) => {
        return axios.get(BaseUrl + 'react/getcontributionuser', {
            headers: headers
        })
        .then(responce => {
            if(responce.data.payload.success === "true"){
                dispatch(setContributionUserResults(responce.data.payload.contibution))
            } else {
                dispatch(clearSensitiveinfo())
            };
        })
        .catch(error => {
            throw(error);
        });
    }
}

export function setRedirectFlagForAdmin(value){
    return (dispatch) => {
        dispatch(setRedirectFlagForAdminDispatch(value))
    }
} 

function setContributionUserResults(value){
    return{
        type: SET_USER_CONTRIBUTION,
        userContribution: value    
    } 
}

function setRedirectFlagForAdminDispatch(value){
    return{
        type: SET_REDIRECT_FLAG_FORADMIN,
        redirectFlagForAdmin: value    
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

function setCurrSubjectContributionIdRedux(id){
    return{
        type: SET_CURRENT_CONTRIBUTION_SUBJECT_ID,
        subjectId: id    
    }
}

function setCurrSubjectContributionNameRedux(name){
    return{
        type: SET_CURRENT_CONTRIBUTION_SUBJECT_NAME,
        subjectName: name    
    }
}

function setContributionAdminResults(contribution){
    return{
        type: SET_ADMIN_CONTRIBUTION,
        contributionAdminResults: contribution    
    }
}

function clearSensitiveinfo(){
    return{
        type: CLEAR_SENSITIVE_INFO,
    }
}

function setContributionItemAdminResults(content){
    return{
        type: SET_CONTRIBUTION_CONTENT,
        contributionAdminItemResults: content    
    }
}

function setContributionItemUserResults(content){
    return{
        type: SET_USER_CONTRIBUTION_ITEM,
        contributionUserItemResults: content    
    }
}