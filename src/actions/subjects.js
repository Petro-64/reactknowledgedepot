import axios from 'axios';
import helpers from '../helpers/Helpers';
import { LOAD_SUBJECTS_ADMIN, LOAD_SUBJECTS_USER, CLEAR_SENSITIVE_INFO, SET_RESULTS_FILTER_ACTIVE_SUBJECTS, 
    SET_FLASH_MESSAGES_VISIBILITY, SET_FLASH_MESSAGES_MESSAGE, SET_FLASH_MESSAGES_TYPE } from '../types';
import store from '../index.js';
import {reset} from 'redux-form';
import messages from '../translations/actions/subjects';

const BaseUrl = helpers.UrlSniffer();

export function loadSubjects(){// this is for user, no JWT token needed
    return (dispatch) => {
        return axios.get(BaseUrl + 'react/subjects').then((responce)=>{
            dispatch(changeSubjectsAdmin(responce.data.payload.subjects))
        })
    }
}

export const saveSubject = ({id, name}) => {
    const translations = {
        subjEditSuccess:  store.getState().settingsReducer.language === 'en' ? messages.en.subjEditSuccess : messages.ru.subjEditSuccess,
    }
    const JWT = store.getState().loginSignUpReducer.JWToken;
    const headers = { 'JWToken': JWT };
    return (dispatch) => {
        return axios.post(BaseUrl + 'react/editsubjects', {id, name}, {
            headers: headers
        })
        .then(response => {
            if(response.data.payload.success === "true"){
                return axios.get(BaseUrl + 'react/subjectsadmin', {
                    headers: headers
                }).then((responce)=>{
                    dispatch(changeSubjectsAdmin(responce.data.payload.subjects))
                    showFlashMessage(dispatch, translations.subjEditSuccess, 'success');
                })
            } else {
                dispatch(clearSensitiveinfo([]))
            };
        })
        .catch(error => {
            throw(error);
        });
    };
}

export const deleteSubject = ({id}) => {
    const translations = {
        subjdeleteSuccess:  store.getState().settingsReducer.language === 'en' ? messages.en.subjdeleteSuccess : messages.ru.subjdeleteSuccess,
    }
    const JWT = store.getState().loginSignUpReducer.JWToken;
    const headers = { 'JWToken': JWT };
    return (dispatch) => {
        return axios.delete(BaseUrl + 'react/deletesubjects/'+ id,  {
            headers: headers
        })
        .then(response => {
            if(response.data.payload.success === "true"){
                return axios.get(BaseUrl + 'react/subjectsadmin', {
                    headers: headers
                }).then((responce)=>{
                    dispatch(changeSubjectsAdmin(responce.data.payload.subjects))
                    showFlashMessage(dispatch, translations.subjdeleteSuccess, 'success');
                })
            } else {
                dispatch(clearSensitiveinfo())
            };
        })
        .catch(error => {
            throw(error.message);
        });
    };
}

export function addSubjectOne(){
    const translations = {
        subjAddSuccess:  store.getState().settingsReducer.language === 'en' ? messages.en.subjAddSuccess : messages.ru.subjAddSuccess,
    }
    const JWT = store.getState().loginSignUpReducer.JWToken;
    const subject = store.getState().form.addSubjectForm.values.subject;// in this case store is available
    const headers = { 'JWToken': JWT };
    return (dispatch) => {
        return axios.post(BaseUrl + 'react/addsubjects', {subject}, {
            headers: headers
        })
        .then(response => {
            if(response.data.payload.success === "true"){
                this.loadSubjectsAdmin();
                dispatch(reset('addSubjectForm'));
                showFlashMessage(dispatch, translations.subjAddSuccess, 'success');
            } else {
                dispatch(clearSensitiveinfo())
            };
        })
        .catch(error => {
            throw(error);
        });
    };
}

export const toggleSubjectActivity = ({id}) => {
    const JWT = store.getState().loginSignUpReducer.JWToken;
    const timeout = store.getState().settingsReducer.flashMessagesTimeout;
    const headers = { 'JWToken': JWT };
    return (dispatch) => {
        return axios.get(BaseUrl + 'react/togglesubjectactivity/'+ id,  {
            headers: headers
        })
        .then(response => {
            if(response.data.payload.success === "true"){
                return axios.get(BaseUrl + 'react/subjectsadmin', {
                    headers: headers
                })
        .then((responce)=>{
                    if(response.data.payload.success === "true"){
                        dispatch(changeSubjectsAdmin(responce.data.payload.subjects));
                        dispatch(changeFlashMessageVisibility(1));
                        dispatch(changeFlashMessageMessage('Subject activity has been changed successfully'));
                        dispatch(changeFlashMessageType('success'));
                        setTimeout(function(){ dispatch(changeFlashMessageVisibility(0)); }, timeout);
                        return axios.get(BaseUrl + 'react/subjects')
        .then(responce => {
                            if(responce.data.payload.success === "true"){
                                let selectedCheckboxes = new Set();// we need this to be able to filter results in advance, this is one of the filters to show results
                                responce.data.payload.subjects.map((subject) =>selectedCheckboxes.add(subject.name))// we need this to be able to filter.......
                                dispatch(ResultsFilterActiveSubjects([...selectedCheckboxes]))// we need this to be able to filter results.......
                                dispatch(changeSubjectsUser(responce.data.payload.subjects))
                            } 
                        })
                        .catch(error => {
                            throw(error);
                        });
                    } else {
                        dispatch(clearSensitiveinfo())
                    };
                })
            } else {
                dispatch(clearSensitiveinfo())
            };
        })
        .catch(error => {
            throw(error.message);
        });
    };
}

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

export function loadSubjectsUsers(){
    return (dispatch) => {
        return axios.get(BaseUrl + 'react/subjects')
        .then(responce => {
            if(responce.data.payload.success === "true"){
                let selectedCheckboxes = new Set();// we need this to be able to filter results in advance, this is one of the filters to show results
                responce.data.payload.subjects.map((subject) =>selectedCheckboxes.add(subject.name))// we need this to be able to filter.......
                dispatch(ResultsFilterActiveSubjects([...selectedCheckboxes]))// we need this to be able to filter results.......
                dispatch(changeSubjectsUser(responce.data.payload.subjects))
            } 
        })
        .catch(error => {
            throw(error);
        });
    }
}

function showFlashMessage(dispatch, message, type){
    const timeout = store.getState().settingsReducer.flashMessagesTimeout;
    dispatch(changeFlashMessageVisibility(1));
    dispatch(changeFlashMessageMessage(message));
    dispatch(changeFlashMessageType(type));
    setTimeout(function(){ dispatch(changeFlashMessageVisibility(0)); }, timeout);
}

function changeSubjectsAdmin(subjects){
    return{
        type: LOAD_SUBJECTS_ADMIN,
        subjects: subjects    
    }
}

function changeSubjectsUser(subjects){
    return{
        type: LOAD_SUBJECTS_USER,
        subjectsUser: subjects    
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