import axios from 'axios';
import helpers from '../helpers/Helpers';
import { SET_CURRENT_CONTRIBUTION_SUBJECT_ID, SET_CURRENT_CONTRIBUTION_SUBJECT_NAME, 
    SET_ADMIN_CONTRIBUTION, CLEAR_SENSITIVE_INFO, SET_CONTRIBUTION_CONTENT, SET_REDIRECT_FLAG_FORADMIN, SET_USER_CONTRIBUTION, SET_USER_CONTRIBUTION_ITEM }  from '../types';
import {reset} from 'redux-form';
import store from '../index.js';
import showMuiFlashMessage from './snackBarControl';


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

export function sentMyContributionSaga({question, firstAnswer, secondAnswer, thirdAnswer, fourthAnswer, subjectId}){
    return (dispatch) => {
        dispatch(sentMyContributionSagADispatch({question, firstAnswer, secondAnswer, thirdAnswer, fourthAnswer, subjectId}))
    };
}

function sentMyContributionSagADispatch({question, firstAnswer, secondAnswer, thirdAnswer, fourthAnswer, subjectId}){
    return{
        type: 'POST_CONTRIBUTION_SAGA', question, firstAnswer, secondAnswer, thirdAnswer, fourthAnswer, subjectId
    }
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
    return (dispatch) => {
        return axios.post(BaseUrl + 'react/approvecontributionitemadmin', { question, firstAnswer, secondAnswer, thirdAnswer, fourthAnswer, contibutionid, subjectId, userId }, {
            headers: headers
        })
        .then(response => {
            if(response.data.payload.success === "true"){
                dispatch(reset('editContibutionFormAdminRedux'));
                showMuiFlashMessage(dispatch, 'Approved and saved, thanks', 'success');
                dispatch(setContributionItemAdminResults({}));
                dispatch(setRedirectFlagForAdminDispatch(2));
            } else {
                showMuiFlashMessage(dispatch, 'Network error', 'error');
            };
        })
        .catch(error => {
            showMuiFlashMessage(dispatch, 'Network error', 'error');
        });
    };
}

export function declineContributionAdmin() {
    const contibutionid = store.getState().form.editContibutionFormAdminRedux.values.contibutionid;
    const JWT = store.getState().loginSignUpReducer.JWToken;
    const headers = { 'JWToken': JWT };
    return (dispatch) => {
        return axios.post(BaseUrl + 'react/declinecontributionitemadmin', { contibutionid }, {
            headers: headers
        })
        .then(response => {
            if(response.data.payload.success === "true"){
                dispatch(reset('editContibutionFormAdminRedux'));
                showMuiFlashMessage(dispatch, 'Declined, thanks', 'success');
                dispatch(setContributionItemAdminResults({}));
                dispatch(setRedirectFlagForAdminDispatch(2));// this is done for auto redirection
            } else {
                showMuiFlashMessage(dispatch, 'Network error', 'error');
            };
        })
        .catch(error => {
            showMuiFlashMessage(dispatch, 'Network error', 'error');
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
    const JWT = store.getState().loginSignUpReducer.JWToken;
    const headers = { 'JWToken': JWT };

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